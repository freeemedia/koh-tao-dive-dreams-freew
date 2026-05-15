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
    private $content_table_name;
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
        $this->content_table_name = $wpdb->prefix . 'ktd_page_content';

        // Security hardening: disable XML-RPC attack surface.
        add_filter('xmlrpc_enabled', '__return_false');
        add_filter('xmlrpc_methods', array($this, 'disable_xmlrpc_methods'));
        add_filter('wp_headers', array($this, 'disable_pingback_header'));
        add_action('init', array($this, 'block_xmlrpc_direct_requests'));
        add_action('template_redirect', array($this, 'lock_admin_subdomain_pages'), 1);

        add_action('rest_api_init', array($this, 'register_rest_routes'));
        add_action('admin_menu', array($this, 'register_admin_page'));
        add_action('admin_init', array($this, 'register_settings'));
        add_action('admin_init', array($this, 'repair_dashboard_page_content'));
    }

    public function disable_xmlrpc_methods($methods) {
        if (is_array($methods)) {
            unset($methods['pingback.ping'], $methods['pingback.extensions.getPingbacks']);
        }
        return $methods;
    }

    public function disable_pingback_header($headers) {
        if (is_array($headers) && isset($headers['X-Pingback'])) {
            unset($headers['X-Pingback']);
        }
        return $headers;
    }

    public function block_xmlrpc_direct_requests() {
        if (!isset($_SERVER['REQUEST_URI'])) {
            return;
        }

        $uri = (string) $_SERVER['REQUEST_URI'];
        if (stripos($uri, 'xmlrpc.php') !== false) {
            status_header(403);
            exit('XML-RPC is disabled.');
        }
    }

    public function lock_admin_subdomain_pages() {
        $host = isset($_SERVER['HTTP_HOST']) ? strtolower((string) $_SERVER['HTTP_HOST']) : '';
        if ($host !== 'admin.divinginasia.com') {
            return;
        }

        // Keep non-template request types and login flow available.
        if (is_admin() || wp_doing_ajax() || wp_doing_cron() || (defined('REST_REQUEST') && REST_REQUEST)) {
            return;
        }

        if (!is_user_logged_in()) {
            auth_redirect();
        }

        if (!current_user_can('manage_options')) {
            $this->render_secure_access_denied();
        }
    }

    private function render_secure_access_denied() {
        $support_email = sanitize_email((string) get_option('admin_email', 'support@divinginasia.com'));
        $help_email = $support_email !== '' ? antispambot($support_email) : 'support@divinginasia.com';
        $home_link = esc_url(home_url('/'));
        $logout_link = esc_url(wp_logout_url($home_link));

        $access_html = '<div style="max-width:560px;margin:48px auto;padding:36px 32px;border:1px solid #d1d5db;border-radius:14px;background:#ffffff;box-shadow:0 12px 30px rgba(15,23,42,0.08);font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;line-height:1.55;color:#0f172a;">';
        $access_html .= '<div style="display:inline-block;padding:5px 10px;border-radius:999px;background:#e0f2fe;color:#0c4a6e;font-size:12px;font-weight:700;letter-spacing:0.02em;">SECURE NETWORK ACCESS</div>';
        $access_html .= '<h1 style="margin:14px 0 8px;font-size:26px;line-height:1.2;">Restricted Area</h1>';
        $access_html .= '<p style="margin:0 0 18px;font-size:15px;color:#334155;">Your account is authenticated but does not have permission to access this protected section.</p>';
        $access_html .= '<p style="margin:0 0 20px;font-size:14px;color:#475569;">If you need access, contact <a href="mailto:' . esc_attr($help_email) . '" style="color:#0369a1;text-decoration:none;font-weight:600;">' . esc_html($help_email) . '</a>.</p>';
        $access_html .= '<div style="display:flex;gap:10px;flex-wrap:wrap;">';
        $access_html .= '<a href="' . $home_link . '" style="display:inline-block;padding:10px 14px;border-radius:9px;background:#0369a1;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;">Return to Website</a>';
        $access_html .= '<a href="' . $logout_link . '" style="display:inline-block;padding:10px 14px;border-radius:9px;border:1px solid #cbd5e1;color:#0f172a;text-decoration:none;font-weight:600;font-size:14px;">Switch Account</a>';
        $access_html .= '</div></div>';

        wp_die(
            $access_html,
            __('Secure Network Access'),
            array(
                'response' => 403,
                'back_link' => false,
            )
        );
    }

    public function repair_dashboard_page_content() {
        if (!current_user_can('manage_options')) {
            return;
        }

        $dashboard_page_id = (int) get_option('ktd_dashboard_page_id', 0);
        if ($dashboard_page_id <= 0) {
            $pages = get_posts(array(
                'post_type'      => 'page',
                'post_status'    => 'publish',
                'posts_per_page' => 1,
                'meta_key'       => '_wp_page_template',
                'meta_value'     => 'template-ktd-dashboard.php',
                'fields'         => 'ids',
            ));

            if (!empty($pages) && isset($pages[0])) {
                $dashboard_page_id = (int) $pages[0];
                update_option('ktd_dashboard_page_id', $dashboard_page_id);
            }
        }

        if ($dashboard_page_id <= 0) {
            return;
        }

        $template = get_post_meta($dashboard_page_id, '_wp_page_template', true);
        if ($template !== 'template-ktd-dashboard.php') {
            return;
        }

        $page = get_post($dashboard_page_id);
        if (!$page || !isset($page->post_content) || $page->post_content === '') {
            return;
        }

        $content = (string) $page->post_content;
        $looks_corrupted = (
            stripos($content, '<?php') !== false ||
            stripos($content, 'display_name, 0, 1') !== false ||
            stripos($content, 'wp_logout_url( home_url() )') !== false ||
            stripos($content, "admin_url( 'post-new.php' )") !== false ||
            stripos($content, 'get_site_icon_url( 64 )') !== false ||
            stripos($content, 'KTD CRM') !== false
        );

        if (!$looks_corrupted) {
            return;
        }

        wp_update_post(array(
            'ID'           => $dashboard_page_id,
            'post_content' => '',
        ));
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
            internal_notes TEXT,
            payment_status VARCHAR(30) DEFAULT 'unpaid',
            payment_link_url TEXT,
            mollie_link_id VARCHAR(100) DEFAULT '',
            raw_payload LONGTEXT,
            PRIMARY KEY  (id),
            KEY status (status),
            KEY booking_type (booking_type),
            KEY created_at (created_at)
        ) {$charset_collate};";

        dbDelta($sql);

        $sql2 = "CREATE TABLE {$wpdb->prefix}ktd_page_content (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            page_slug VARCHAR(255) NOT NULL DEFAULT '',
            section_key VARCHAR(255) NOT NULL DEFAULT '',
            locale VARCHAR(20) NOT NULL DEFAULT 'en',
            content_value LONGTEXT,
            content_type VARCHAR(50) DEFAULT 'text',
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            PRIMARY KEY  (id),
            UNIQUE KEY slug_section_locale (page_slug(191), section_key(191), locale(20)),
            KEY page_slug (page_slug),
            KEY locale (locale)
        ) {$charset_collate};";

        dbDelta($sql2);
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

        register_rest_route('ktd/v1', '/bookings/(?P<id>\d+)', array(
            'methods' => 'PATCH',
            'callback' => array($this, 'update_booking'),
            'permission_callback' => array($this, 'validate_api_key'),
            'args' => array(
                'id' => array('required' => true, 'sanitize_callback' => 'absint'),
            ),
        ));

        register_rest_route('ktd/v1', '/bookings/(?P<id>\d+)', array(
            'methods' => WP_REST_Server::DELETABLE,
            'callback' => array($this, 'delete_booking'),
            'permission_callback' => array($this, 'validate_api_key'),
            'args' => array(
                'id' => array('required' => true, 'sanitize_callback' => 'absint'),
            ),
        ));

        // Page content routes
        register_rest_route('ktd/v1', '/page-content', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array($this, 'get_page_content'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('ktd/v1', '/page-content', array(
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => array($this, 'upsert_page_content'),
            'permission_callback' => array($this, 'validate_api_key_or_bearer'),
        ));

        register_rest_route('ktd/v1', '/page-content/(?P<id>\d+)', array(
            'methods' => 'PUT',
            'callback' => array($this, 'update_page_content'),
            'permission_callback' => array($this, 'validate_api_key_or_bearer'),
            'args' => array(
                'id' => array('required' => true, 'sanitize_callback' => 'absint'),
            ),
        ));

        register_rest_route('ktd/v1', '/page-content/(?P<id>\d+)', array(
            'methods' => WP_REST_Server::DELETABLE,
            'callback' => array($this, 'delete_page_content'),
            'permission_callback' => array($this, 'validate_api_key_or_bearer'),
            'args' => array(
                'id' => array('required' => true, 'sanitize_callback' => 'absint'),
            ),
        ));

        register_rest_route('ktd/v1', '/page-slugs', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array($this, 'list_page_slugs'),
            'permission_callback' => array($this, 'validate_api_key_or_bearer'),
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
        if ($provided === '') {
            $provided = trim((string) $request->get_param('api_key'));
        }
        if ($provided === '' || !hash_equals($expected, $provided)) {
            return new WP_Error('ktd_invalid_api_key', 'Invalid API key.', array('status' => 401));
        }

        return true;
    }

    public function validate_api_key_or_bearer($request) {
        $expected = trim((string) get_option($this->option_key, ''));
        if ($expected === '') {
            return new WP_Error('ktd_missing_api_key', 'WordPress booking API key is not configured.', array('status' => 500));
        }

        // Accept x-ktd-api-key header
        $provided = trim((string) $request->get_header('x-ktd-api-key'));
        // Accept Authorization: Bearer {key}
        if ($provided === '') {
            $auth_header = trim((string) $request->get_header('authorization'));
            if (strncasecmp($auth_header, 'bearer ', 7) === 0) {
                $provided = trim(substr($auth_header, 7));
            }
        }
        if ($provided === '') {
            $provided = trim((string) $request->get_param('api_key'));
        }
        if ($provided === '' || !hash_equals($expected, $provided)) {
            return new WP_Error('ktd_invalid_api_key', 'Invalid API key.', array('status' => 401));
        }

        return true;
    }

    public function get_page_content($request) {
        global $wpdb;
        $table = $this->content_table_name;

        $raw_slug   = trim((string) ($request->get_param('slug') ?? ''));
        $raw_locale = trim((string) ($request->get_param('locale') ?? 'en'));
        $slug       = sanitize_text_field($raw_slug);
        $locale     = sanitize_text_field($raw_locale ?: 'en');

        if ($slug === '') {
            return new WP_REST_Response(array(), 200);
        }

        // Try exact slug then slug without leading slash
        $clean_slug   = ltrim($slug, '/');
        $results      = array();
        $tried_slugs  = array_unique(array($slug, $clean_slug, '/' . $clean_slug));

        foreach ($tried_slugs as $try_slug) {
            $rows = $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT section_key, content_value, content_type, updated_at FROM {$table} WHERE page_slug = %s AND locale = %s",
                    $try_slug,
                    $locale
                ),
                ARRAY_A
            );
            if (!empty($rows)) {
                $results = $rows;
                break;
            }
        }

        return new WP_REST_Response($results, 200);
    }

    public function upsert_page_content($request) {
        global $wpdb;
        $table = $this->content_table_name;

        $body = $request->get_json_params();
        if (!is_array($body)) {
            return new WP_Error('ktd_invalid_payload', 'Payload must be a JSON object or array.', array('status' => 400));
        }

        $rows = isset($body[0]) ? $body : array($body);
        $now  = current_time('mysql');
        $saved = array();

        foreach ($rows as $row) {
            $page_slug    = sanitize_text_field((string) ($row['page_slug'] ?? ''));
            $section_key  = sanitize_text_field((string) ($row['section_key'] ?? ''));
            $locale       = sanitize_text_field((string) ($row['locale'] ?? 'en'));
            $content_value = (string) ($row['content_value'] ?? '');
            $content_type  = sanitize_text_field((string) ($row['content_type'] ?? 'text'));

            if ($page_slug === '' || $section_key === '' || $locale === '') {
                continue;
            }

            $existing_id = $wpdb->get_var(
                $wpdb->prepare(
                    "SELECT id FROM {$table} WHERE page_slug = %s AND section_key = %s AND locale = %s",
                    $page_slug, $section_key, $locale
                )
            );

            if ($existing_id) {
                $wpdb->update(
                    $table,
                    array('content_value' => $content_value, 'content_type' => $content_type, 'updated_at' => $now),
                    array('id' => (int) $existing_id),
                    array('%s', '%s', '%s'),
                    array('%d')
                );
                $saved[] = (int) $existing_id;
            } else {
                $wpdb->insert(
                    $table,
                    array(
                        'page_slug'     => $page_slug,
                        'section_key'   => $section_key,
                        'locale'        => $locale,
                        'content_value' => $content_value,
                        'content_type'  => $content_type,
                        'created_at'    => $now,
                        'updated_at'    => $now,
                    ),
                    array('%s', '%s', '%s', '%s', '%s', '%s', '%s')
                );
                $saved[] = (int) $wpdb->insert_id;
            }
        }

        return new WP_REST_Response(array('success' => true, 'ids' => $saved), 201);
    }

    public function update_page_content($request) {
        global $wpdb;
        $table = $this->content_table_name;
        $id    = absint($request['id']);

        if (!$id) {
            return new WP_Error('ktd_invalid_id', 'Invalid content ID.', array('status' => 400));
        }

        $body = $request->get_json_params();
        if (!is_array($body)) {
            return new WP_Error('ktd_invalid_payload', 'Payload must be a JSON object.', array('status' => 400));
        }

        $updates  = array('updated_at' => current_time('mysql'));
        $formats  = array('%s');

        if (array_key_exists('content_value', $body)) {
            $updates['content_value'] = (string) $body['content_value'];
            $formats[] = '%s';
        }
        if (array_key_exists('content_type', $body)) {
            $updates['content_type'] = sanitize_text_field((string) $body['content_type']);
            $formats[] = '%s';
        }

        $result = $wpdb->update($table, $updates, array('id' => $id), $formats, array('%d'));
        if ($result === false) {
            return new WP_Error('ktd_update_failed', 'Database update failed.', array('status' => 500));
        }

        return new WP_REST_Response(array('success' => true), 200);
    }

    public function delete_page_content($request) {
        global $wpdb;
        $table = $this->content_table_name;
        $id    = absint($request['id']);

        if (!$id) {
            return new WP_Error('ktd_invalid_id', 'Invalid content ID.', array('status' => 400));
        }

        $deleted = $wpdb->delete($table, array('id' => $id), array('%d'));
        if ($deleted === false) {
            return new WP_Error('ktd_delete_failed', 'Database delete failed.', array('status' => 500));
        }

        return new WP_REST_Response(array('success' => true), 200);
    }

    public function list_page_slugs($request) {
        global $wpdb;
        $table = $this->content_table_name;
        $rows  = $wpdb->get_col("SELECT DISTINCT page_slug FROM {$table} ORDER BY page_slug ASC");
        return new WP_REST_Response(is_array($rows) ? $rows : array(), 200);
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

    public function update_booking($request) {
        global $wpdb;
        $id = absint($request['id']);
        if (!$id) {
            return new WP_Error('ktd_invalid_id', 'Invalid booking ID.', array('status' => 400));
        }
        $payload = $request->get_json_params();
        if (!is_array($payload)) {
            return new WP_Error('ktd_invalid_payload', 'Payload must be a JSON object.', array('status' => 400));
        }

        $allowed = array('status', 'internal_notes', 'message', 'name', 'email', 'phone',
                         'item_title', 'preferred_date', 'deposit_amount', 'total_amount', 'due_amount',
                         'payment_status', 'payment_link_url', 'mollie_link_id');
        $updates = array();
        $formats = array();
        foreach ($allowed as $field) {
            if (!array_key_exists($field, $payload)) continue;
            if (in_array($field, array('deposit_amount', 'total_amount', 'due_amount'), true)) {
                $updates[$field] = $this->normalize_number($payload[$field]);
                $formats[] = '%f';
            } else {
                $updates[$field] = sanitize_textarea_field((string) $payload[$field]);
                $formats[] = '%s';
            }
        }
        if (empty($updates)) {
            return new WP_Error('ktd_no_fields', 'No valid fields to update.', array('status' => 400));
        }
        $updates['updated_at'] = current_time('mysql');
        $formats[] = '%s';

        $result = $wpdb->update($this->table_name, $updates, array('id' => $id), $formats, array('%d'));
        if ($result === false) {
            return new WP_Error('ktd_update_failed', 'Database update failed.', array('status' => 500));
        }

        $row = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$this->table_name} WHERE id = %d", $id), ARRAY_A);
        return new WP_REST_Response(array('success' => true, 'booking' => $row), 200);
    }

    public function list_bookings() {
        global $wpdb;
        $rows = $wpdb->get_results("SELECT * FROM {$this->table_name} ORDER BY created_at DESC LIMIT 500", ARRAY_A);
        if (!headers_sent()) {
            nocache_headers();
        }

        $response = new WP_REST_Response(array('success' => true, 'data' => $rows), 200);
        $response->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
        $response->header('Pragma', 'no-cache');
        $response->header('Expires', 'Wed, 11 Jan 1984 05:00:00 GMT');

        return $response;
    }

    public function delete_booking($request) {
        global $wpdb;
        $id = absint($request['id']);
        if (!$id) {
            return new WP_Error('ktd_invalid_id', 'Invalid booking ID.', array('status' => 400));
        }

        $deleted = $wpdb->delete($this->table_name, array('id' => $id), array('%d'));
        if ($deleted === false) {
            return new WP_Error('ktd_delete_failed', 'Database delete failed.', array('status' => 500));
        }
        if ((int) $deleted === 0) {
            return new WP_Error('ktd_not_found', 'Booking not found.', array('status' => 404));
        }

        return new WP_REST_Response(array(
            'success' => true,
            'deleted' => $id,
        ), 200);
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
