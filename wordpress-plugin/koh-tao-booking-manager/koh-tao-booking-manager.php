<?php
/**
 * Plugin Name: Koh Tao Booking Manager
 * Description: Stores booking requests via REST and provides an admin bookings screen.
 * Version: 1.0.0
 * Author: One Media Asia
 */

if (!defined('ABSPATH')) {
    exit;
}

class KTD_Booking_Manager {
    private static $instance = null;
    private $table_name;
    private $option_key = 'ktd_booking_api_key';

    public static function instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        global $wpdb;
        $this->table_name = $wpdb->prefix . 'ktd_bookings';

        add_action('rest_api_init', array($this, 'register_rest_routes'));
        add_action('admin_menu', array($this, 'register_admin_page'));
        add_action('admin_init', array($this, 'register_settings'));
    }

    public static function activate() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'ktd_bookings';
        $charset_collate = $wpdb->get_charset_collate();

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';

        $sql = "CREATE TABLE {$table_name} (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            status VARCHAR(30) NOT NULL DEFAULT 'new',
            booking_type VARCHAR(30) DEFAULT '',
            item_title VARCHAR(255) DEFAULT '',
            name VARCHAR(255) DEFAULT '',
            email VARCHAR(255) DEFAULT '',
            phone VARCHAR(50) DEFAULT '',
            preferred_date VARCHAR(50) DEFAULT '',
            guests INT DEFAULT 0,
            nights INT DEFAULT 0,
            experience_level VARCHAR(100) DEFAULT '',
            payment_choice VARCHAR(100) DEFAULT '',
            currency VARCHAR(10) DEFAULT 'THB',
            deposit_amount DECIMAL(12,2) DEFAULT NULL,
            total_amount DECIMAL(12,2) DEFAULT NULL,
            due_amount DECIMAL(12,2) DEFAULT NULL,
            paypal_link TEXT,
            addons TEXT,
            booking_source VARCHAR(100) DEFAULT '',
            message TEXT,
            raw_payload LONGTEXT,
            PRIMARY KEY  (id),
            KEY status (status),
            KEY booking_type (booking_type),
            KEY created_at (created_at)
        ) {$charset_collate};";

        dbDelta($sql);
    }

    public function register_settings() {
        register_setting('ktd_booking_settings', $this->option_key);
    }

    public function register_rest_routes() {
        register_rest_route('ktd/v1', '/bookings', array(
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => array($this, 'create_booking'),
            'permission_callback' => '__return_true',
        ));

        // Also accept /bookings/create for frontend compatibility
        register_rest_route('ktd/v1', '/bookings/create', array(
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => array($this, 'create_booking'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('ktd/v1', '/bookings', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array($this, 'list_bookings'),
            'permission_callback' => array($this, 'validate_api_key'),
        ));
    }

    private function normalize_number($value) {
        if ($value === null || $value === '') {
            return null;
        }
        return is_numeric($value) ? (float) $value : null;
    }

    public function validate_api_key($request) {
        $expected = trim((string) get_option($this->option_key, ''));
        if ($expected === '') {
            return new WP_Error('ktd_missing_api_key', 'WordPress booking API key is not configured.', array('status' => 500));
        }

        $provided = trim((string) $request->get_header('x-ktd-api-key'));
        if ($provided === '' || !hash_equals($expected, $provided)) {
            return new WP_Error('ktd_invalid_api_key', 'Invalid API key.', array('status' => 401));
        }

        return true;
    }

    public function create_booking($request) {
        $auth = $this->validate_api_key($request);
        if (is_wp_error($auth)) {
            return $auth;
        }

        $payload = $request->get_json_params();
        if (!is_array($payload)) {
            return new WP_Error('ktd_invalid_payload', 'Payload must be a JSON object.', array('status' => 400));
        }

        $name = sanitize_text_field($payload['name'] ?? '');
        $email = sanitize_email($payload['email'] ?? '');
        if ($name === '' || $email === '') {
            return new WP_Error('ktd_required', 'Name and email are required.', array('status' => 400));
        }

        global $wpdb;
        $now = current_time('mysql');
        $inserted = $wpdb->insert(
            $this->table_name,
            array(
                'created_at' => $now,
                'updated_at' => $now,
                'status' => sanitize_text_field($payload['status'] ?? 'new'),
                'booking_type' => sanitize_text_field($payload['booking_type'] ?? ''),
                'item_title' => sanitize_text_field($payload['item_title'] ?? ''),
                'name' => $name,
                'email' => $email,
                'phone' => sanitize_text_field($payload['phone'] ?? ''),
                'preferred_date' => sanitize_text_field($payload['preferred_date'] ?? ''),
                'guests' => absint($payload['guests'] ?? 0),
                'nights' => absint($payload['nights'] ?? 0),
                'experience_level' => sanitize_text_field($payload['experience_level'] ?? ''),
                'payment_choice' => sanitize_text_field($payload['payment_choice'] ?? ''),
                'currency' => sanitize_text_field($payload['currency'] ?? 'THB'),
                'deposit_amount' => $this->normalize_number($payload['deposit_amount'] ?? null),
                'total_amount' => $this->normalize_number($payload['total_amount'] ?? null),
                'due_amount' => $this->normalize_number($payload['due_amount'] ?? null),
                'paypal_link' => esc_url_raw($payload['paypal_link'] ?? ''),
                'addons' => sanitize_textarea_field($payload['addons'] ?? ''),
                'booking_source' => sanitize_text_field($payload['booking_source'] ?? ''),
                'message' => sanitize_textarea_field($payload['message'] ?? ''),
                'raw_payload' => wp_json_encode($payload),
            ),
            array(
                '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%d', '%d', '%s', '%s', '%s', '%f', '%f', '%f', '%s', '%s', '%s', '%s', '%s'
            )
        );

        if ($inserted === false) {
            return new WP_Error('ktd_insert_failed', 'Failed to save booking.', array('status' => 500));
        }

        return new WP_REST_Response(array(
            'success' => true,
            'id' => (int) $wpdb->insert_id,
        ), 201);
    }

    public function list_bookings() {
        global $wpdb;
        $rows = $wpdb->get_results("SELECT * FROM {$this->table_name} ORDER BY created_at DESC LIMIT 500", ARRAY_A);
        return new WP_REST_Response(array('success' => true, 'data' => $rows), 200);
    }

    public function register_admin_page() {
        add_menu_page(
            'KTD Bookings',
            'KTD Bookings',
            'manage_options',
            'ktd-bookings',
            array($this, 'render_admin_page'),
            'dashicons-calendar-alt',
            26
        );
    }

    public function render_admin_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        global $wpdb;
        $rows = $wpdb->get_results("SELECT * FROM {$this->table_name} ORDER BY created_at DESC LIMIT 300", ARRAY_A);
        ?>
        <div class="wrap">
            <h1>Koh Tao Bookings</h1>

            <form method="post" action="options.php" style="margin: 16px 0; padding: 12px; background: #fff; border: 1px solid #ccd0d4; max-width: 640px;">
                <h2 style="margin-top: 0;">API Settings</h2>
                <?php settings_fields('ktd_booking_settings'); ?>
                <table class="form-table" role="presentation">
                    <tr>
                        <th scope="row"><label for="<?php echo esc_attr($this->option_key); ?>">Booking API Key</label></th>
                        <td>
                            <input type="text" id="<?php echo esc_attr($this->option_key); ?>" name="<?php echo esc_attr($this->option_key); ?>" value="<?php echo esc_attr(get_option($this->option_key, '')); ?>" class="regular-text" />
                            <p class="description">Use this key in your site as header: x-ktd-api-key.</p>
                        </td>
                    </tr>
                </table>
                <?php submit_button('Save API Key'); ?>
            </form>

            <h2>Recent Bookings</h2>
            <table class="widefat striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Created</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Item</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Deposit</th>
                        <th>Total</th>
                        <th>Currency</th>
                    </tr>
                </thead>
                <tbody>
                <?php if (empty($rows)) : ?>
                    <tr><td colspan="10">No bookings found.</td></tr>
                <?php else : ?>
                    <?php foreach ($rows as $row) : ?>
                        <tr>
                            <td><?php echo esc_html($row['id']); ?></td>
                            <td><?php echo esc_html($row['created_at']); ?></td>
                            <td><?php echo esc_html($row['status']); ?></td>
                            <td><?php echo esc_html($row['booking_type']); ?></td>
                            <td><?php echo esc_html($row['item_title']); ?></td>
                            <td><?php echo esc_html($row['name']); ?></td>
                            <td><?php echo esc_html($row['email']); ?></td>
                            <td><?php echo esc_html($row['deposit_amount']); ?></td>
                            <td><?php echo esc_html($row['total_amount']); ?></td>
                            <td><?php echo esc_html($row['currency']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
                </tbody>
            </table>
        </div>
        <?php
    }
}

register_activation_hook(__FILE__, array('KTD_Booking_Manager', 'activate'));
KTD_Booking_Manager::instance();
