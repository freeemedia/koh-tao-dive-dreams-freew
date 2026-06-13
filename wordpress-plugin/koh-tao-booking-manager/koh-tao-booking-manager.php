<?php
/**
 * Plugin Name: Koh Tao Booking Manager
 * Plugin URI: https://divinginasia.com
 * Description: Stores bookings for Koh Tao Dive Dreams and exposes the REST endpoints used by the booking frontend and admin dashboard.
 * Version: 1.0.5
 * Author: Pro Diving Asia
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Text Domain: koh-tao-booking-manager
 */

if (!defined('ABSPATH')) {
    exit;
}

final class KTD_Booking_Manager {
    private const OPTION_API_KEY = 'ktd_booking_api_key';
    private const OPTION_PAGE_SLUG = 'ktd-booking-manager';
    private const TABLE_VERSION = '1.0.1';
    private const NOTES_CLEANUP_VERSION = '2026-06-notes-cleanup-v1';
    private static function is_wordpress_placeholder($value): bool {
        $normalized = strtolower(preg_replace('/[^a-z]/', '', trim((string) $value)) ?? '');
        return $normalized === 'wordpress' || $normalized === 'wordrpress' || str_starts_with($normalized, 'wordpress');
    }

    public static function bootstrap(): void {
        add_action('rest_api_init', [self::class, 'register_rest_routes']);
        add_action('admin_menu', [self::class, 'register_admin_page']);
        add_action('admin_init', [self::class, 'register_settings']);
        add_action('init', [self::class, 'maybe_upgrade_schema']);
        add_action('init', [self::class, 'run_notes_cleanup_once']);
    }

    public static function activate(): void {
        self::create_tables();
        update_option('ktd_booking_manager_db_version', self::TABLE_VERSION);
        self::run_notes_cleanup_once();
    }

    public static function maybe_upgrade_schema(): void {
        $installed = (string) get_option('ktd_booking_manager_db_version', '');
        if ($installed === self::TABLE_VERSION) {
            return;
        }

        self::create_tables();
        update_option('ktd_booking_manager_db_version', self::TABLE_VERSION);
    }

    public static function run_notes_cleanup_once(): void {
        $done = (string) get_option('ktd_notes_cleanup_version', '');
        if ($done === self::NOTES_CLEANUP_VERSION) {
            return;
        }

        global $wpdb;
        $table = self::bookings_table();

        // One-time data normalization for legacy placeholder values.
        $wpdb->query("UPDATE {$table} SET internal_notes = '' WHERE LOWER(TRIM(COALESCE(internal_notes, ''))) = 'wordpress'");
        $wpdb->query("UPDATE {$table} SET message = '' WHERE LOWER(TRIM(COALESCE(message, ''))) = 'wordpress'");

        update_option('ktd_notes_cleanup_version', self::NOTES_CLEANUP_VERSION);
    }

    private static function create_tables(): void {
        global $wpdb;

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';

        $charset_collate = $wpdb->get_charset_collate();
        $bookings_table = self::bookings_table();
        $crm_table = self::crm_table();

        $sql = "CREATE TABLE {$bookings_table} (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(190) DEFAULT '',
            email VARCHAR(190) DEFAULT '',
            phone VARCHAR(80) DEFAULT '',
            accommodation VARCHAR(190) DEFAULT '',
            item_type VARCHAR(100) DEFAULT '',
            course_title VARCHAR(190) DEFAULT '',
            item_title VARCHAR(190) DEFAULT '',
            preferred_date DATE NULL,
            experience_level VARCHAR(190) DEFAULT '',
            payment_choice VARCHAR(100) DEFAULT '',
            payment_mode VARCHAR(100) DEFAULT '',
            payment_status VARCHAR(100) DEFAULT '',
            currency VARCHAR(20) DEFAULT 'THB',
            message LONGTEXT NULL,
            internal_notes LONGTEXT NULL,
            status VARCHAR(60) DEFAULT 'new',
            payment_link_url TEXT NULL,
            paypal_link_url TEXT NULL,
            bank_transfer_details LONGTEXT NULL,
            booking_source VARCHAR(120) DEFAULT 'wordpress',
            source_page VARCHAR(255) DEFAULT '',
            event_type VARCHAR(120) DEFAULT '',
            guest_count INT NULL,
            accommodation_interest VARCHAR(190) DEFAULT '',
            total_amount DECIMAL(12,2) NULL,
            deposit_amount DECIMAL(12,2) NULL,
            due_amount DECIMAL(12,2) NULL,
            subtotal_amount DECIMAL(12,2) NULL,
            total_payable_now DECIMAL(12,2) NULL,
            tags LONGTEXT NULL,
            extra_json LONGTEXT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            KEY status (status),
            KEY email (email),
            KEY preferred_date (preferred_date),
            KEY created_at (created_at)
        ) {$charset_collate};";

        $crm_sql = "CREATE TABLE {$crm_table} (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            booking_id VARCHAR(80) DEFAULT '',
            source VARCHAR(120) DEFAULT '',
            source_page VARCHAR(255) DEFAULT '',
            event_type VARCHAR(120) DEFAULT '',
            payload_json LONGTEXT NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY booking_id (booking_id),
            KEY event_type (event_type),
            KEY created_at (created_at)
        ) {$charset_collate};";

        dbDelta($sql);
        dbDelta($crm_sql);
    }

    private static function bookings_table(): string {
        global $wpdb;
        return $wpdb->prefix . 'ktd_bookings';
    }

    private static function crm_table(): string {
        global $wpdb;
        return $wpdb->prefix . 'ktd_crm_intake';
    }

    public static function register_rest_routes(): void {
        register_rest_route('ktd/v1', '/bookings', [
            [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [self::class, 'list_bookings'],
                'permission_callback' => [self::class, 'authorize_request'],
            ],
            [
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => [self::class, 'create_booking'],
                'permission_callback' => [self::class, 'authorize_request'],
            ],
        ]);

        register_rest_route('ktd/v1', '/bookings/create', [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [self::class, 'create_booking'],
            'permission_callback' => [self::class, 'authorize_request'],
        ]);

        register_rest_route('ktd/v1', '/booking', [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [self::class, 'create_booking'],
            'permission_callback' => [self::class, 'authorize_request'],
        ]);

        register_rest_route('ktd/v1', '/bookings/(?P<id>\d+)', [
            [
                'methods' => \WP_REST_Server::READABLE,
                'callback' => [self::class, 'get_booking'],
                'permission_callback' => [self::class, 'authorize_request'],
            ],
            [
                'methods' => 'PATCH, POST, PUT',
                'callback' => [self::class, 'update_booking'],
                'permission_callback' => [self::class, 'authorize_request'],
            ],
            [
                'methods' => \WP_REST_Server::DELETABLE,
                'callback' => [self::class, 'delete_booking'],
                'permission_callback' => [self::class, 'authorize_request'],
            ],
        ]);

        register_rest_route('ktd/v1', '/crm-intake', [
            'methods' => \WP_REST_Server::CREATABLE,
            'callback' => [self::class, 'create_crm_intake'],
            'permission_callback' => [self::class, 'authorize_request'],
        ]);
    }

    public static function authorize_request(\WP_REST_Request $request) {
        if (current_user_can('manage_options')) {
            return true;
        }

        $expected = trim((string) self::get_api_key());
        if ($expected === '') {
            return new \WP_Error('ktd_api_key_missing', 'Plugin API key is not configured.', ['status' => 503]);
        }

        $provided = trim((string) $request->get_header('x-ktd-api-key'));
        if ($provided === '') {
            $payload = $request->get_json_params();
            if (is_array($payload) && isset($payload['api_key'])) {
                $provided = trim((string) $payload['api_key']);
            }
        }
        if ($provided === '') {
            $provided = trim((string) $request->get_param('api_key'));
        }

        if ($provided === '' || !hash_equals($expected, $provided)) {
            return new \WP_Error('ktd_forbidden', 'Invalid API key.', ['status' => 403]);
        }

        return true;
    }

    public static function list_bookings(\WP_REST_Request $request): \WP_REST_Response {
        global $wpdb;

        $table = self::bookings_table();
        $limit = max(1, min(500, absint($request->get_param('limit') ?: 200)));
        $rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$table} ORDER BY created_at DESC LIMIT %d", $limit), ARRAY_A);
        $rows = is_array($rows) ? array_map([self::class, 'normalize_booking_row'], $rows) : [];

        return new \WP_REST_Response([
            'success' => true,
            'data' => $rows,
        ], 200);
    }

    public static function get_booking(\WP_REST_Request $request): \WP_REST_Response {
        global $wpdb;

        $table = self::bookings_table();
        $id = absint($request['id']);
        $row = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE id = %d", $id), ARRAY_A);

        if (!$row) {
            return new \WP_REST_Response([
                'success' => false,
                'message' => 'Booking not found',
            ], 404);
        }

        return new \WP_REST_Response([
            'success' => true,
            'booking' => self::normalize_booking_row($row),
        ], 200);
    }

    public static function create_booking(\WP_REST_Request $request): \WP_REST_Response {
        global $wpdb;

        $payload = self::normalize_booking_payload(self::request_payload($request));
        if ($payload['name'] === '' || $payload['email'] === '') {
            return new \WP_REST_Response([
                'success' => false,
                'message' => 'Name and email are required',
            ], 422);
        }

        $table = self::bookings_table();
        $row_for_storage = self::booking_row_for_storage($payload);
        $inserted = $wpdb->insert($table, $row_for_storage, self::formats_for_row($row_for_storage));

        if ($inserted === false) {
            return new \WP_REST_Response([
                'success' => false,
                'message' => 'Failed to create booking',
            ], 500);
        }

        $id = (int) $wpdb->insert_id;
        $row = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE id = %d", $id), ARRAY_A);

        return new \WP_REST_Response([
            'success' => true,
            'id' => (string) $id,
            'booking' => self::normalize_booking_row($row ?: ['id' => $id] + $row_for_storage),
        ], 201);
    }

    public static function update_booking(\WP_REST_Request $request): \WP_REST_Response {
        global $wpdb;

        $id = absint($request['id']);
        $table = self::bookings_table();
        $existing = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE id = %d", $id), ARRAY_A);

        if (!$existing) {
            return new \WP_REST_Response([
                'success' => false,
                'message' => 'Booking not found',
            ], 404);
        }

        $updates = self::normalize_booking_payload(self::request_payload($request), false);
        $row = self::booking_row_for_storage($updates, false);
        unset($row['created_at']);

        if (empty($row)) {
            return new \WP_REST_Response([
                'success' => false,
                'message' => 'No valid fields to update',
            ], 422);
        }

        $row['updated_at'] = current_time('mysql', true);
        $formats = self::formats_for_row($row);
        $result = $wpdb->update($table, $row, ['id' => $id], $formats, ['%d']);

        if ($result === false) {
            return new \WP_REST_Response([
                'success' => false,
                'message' => 'Failed to update booking',
            ], 500);
        }

        $fresh = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE id = %d", $id), ARRAY_A);

        return new \WP_REST_Response([
            'success' => true,
            'booking' => self::normalize_booking_row($fresh ?: $existing),
        ], 200);
    }

    public static function delete_booking(\WP_REST_Request $request): \WP_REST_Response {
        global $wpdb;

        $table = self::bookings_table();
        $id = absint($request['id']);
        $deleted = $wpdb->delete($table, ['id' => $id], ['%d']);

        if ($deleted === false) {
            return new \WP_REST_Response([
                'success' => false,
                'message' => 'Failed to delete booking',
            ], 500);
        }

        return new \WP_REST_Response([
            'success' => true,
            'deleted' => (string) $id,
        ], 200);
    }

    public static function create_crm_intake(\WP_REST_Request $request): \WP_REST_Response {
        global $wpdb;

        $payload = self::request_payload($request);
        $table = self::crm_table();
        $data = [
            'booking_id' => self::sanitize_string($payload['booking_id'] ?? ''),
            'source' => self::sanitize_string($payload['source'] ?? ''),
            'source_page' => self::sanitize_string($payload['source_page'] ?? ''),
            'event_type' => self::sanitize_string($payload['event_type'] ?? ''),
            'payload_json' => wp_json_encode($payload),
            'created_at' => current_time('mysql', true),
        ];

        $inserted = $wpdb->insert($table, $data, ['%s', '%s', '%s', '%s', '%s', '%s']);

        if ($inserted === false) {
            return new \WP_REST_Response([
                'success' => false,
                'message' => 'Failed to store CRM intake',
            ], 500);
        }

        return new \WP_REST_Response([
            'success' => true,
            'id' => (string) $wpdb->insert_id,
        ], 201);
    }

    private static function request_payload(\WP_REST_Request $request): array {
        $payload = $request->get_json_params();
        if (is_array($payload)) {
            return $payload;
        }

        $params = $request->get_params();
        return is_array($params) ? $params : [];
    }

    private static function normalize_booking_payload(array $input, bool $for_insert = true): array {
        $payload = [];

        foreach (['name', 'email', 'phone', 'accommodation', 'experience_level', 'payment_choice', 'payment_mode', 'payment_status', 'currency', 'message', 'internal_notes', 'status', 'payment_link_url', 'paypal_link_url', 'bank_transfer_details', 'booking_source', 'source_page', 'event_type', 'accommodation_interest'] as $key) {
            if ($for_insert || array_key_exists($key, $input)) {
                $payload[$key] = self::sanitize_string($input[$key] ?? '');
            }
        }

        // Legacy dashboard compatibility: treat `comments` as alias of `internal_notes`.
        if ($for_insert || array_key_exists('comments', $input)) {
            $comments = self::sanitize_string($input['comments'] ?? '');
            if (!array_key_exists('internal_notes', $input) || trim((string) ($payload['internal_notes'] ?? '')) === '') {
                $payload['internal_notes'] = $comments;
            }
        }

        if (isset($payload['internal_notes']) && self::is_wordpress_placeholder($payload['internal_notes'])) {
            $payload['internal_notes'] = '';
        }
        if (isset($payload['message']) && self::is_wordpress_placeholder($payload['message'])) {
            $payload['message'] = '';
        }

        $payload['item_type'] = self::sanitize_string($input['item_type'] ?? $input['booking_type'] ?? '');
        $payload['course_title'] = self::sanitize_string($input['course_title'] ?? $input['item_title'] ?? '');
        $payload['item_title'] = self::sanitize_string($input['item_title'] ?? $input['course_title'] ?? '');
        $payload['preferred_date'] = self::sanitize_date($input['preferred_date'] ?? $input['arrival_date'] ?? '');
        $payload['guest_count'] = self::sanitize_int($input['guest_count'] ?? null);
        $payload['total_amount'] = self::sanitize_amount($input['total_amount'] ?? $input['full_price'] ?? null);
        $payload['deposit_amount'] = self::sanitize_amount($input['deposit_amount'] ?? $input['total_payable_now'] ?? null);
        $payload['due_amount'] = self::sanitize_amount($input['due_amount'] ?? $input['balance_amount'] ?? null);
        $payload['subtotal_amount'] = self::sanitize_amount($input['subtotal_amount'] ?? null);
        $payload['total_payable_now'] = self::sanitize_amount($input['total_payable_now'] ?? null);
        $payload['tags'] = self::sanitize_tags($input['tags'] ?? []);

        $extra = $input;
        unset($extra['api_key']);
        $payload['extra_json'] = wp_json_encode($extra);

        if ($for_insert) {
            if ($payload['status'] === '') {
                $payload['status'] = 'new';
            }
            if ($payload['booking_source'] === '') {
                $payload['booking_source'] = 'wordpress';
            }
        }

        return $payload;
    }

    private static function booking_row_for_storage(array $payload, bool $include_empty = true): array {
        $row = [];

        foreach ($payload as $key => $value) {
            if ($key === 'extra_json' || $include_empty || $value !== null && $value !== '') {
                $row[$key] = $value;
            }
        }

        if (!isset($row['created_at'])) {
            $row['created_at'] = current_time('mysql', true);
        }
        if (!isset($row['updated_at'])) {
            $row['updated_at'] = current_time('mysql', true);
        }

        return $row;
    }

    private static function formats_for_row(array $row): array {
        $formats = [];
        foreach ($row as $key => $value) {
            if ($key === 'guest_count') {
                $formats[] = '%d';
            } elseif (in_array($key, ['total_amount', 'deposit_amount', 'due_amount', 'subtotal_amount', 'total_payable_now'], true)) {
                $formats[] = '%f';
            } else {
                $formats[] = '%s';
            }
        }
        return $formats;
    }

    private static function normalize_booking_row(array $row): array {
        $row['id'] = isset($row['id']) ? (string) $row['id'] : '';
        $row['course_title'] = (string) ($row['course_title'] ?: $row['item_title'] ?: '');
        $row['item_title'] = (string) ($row['item_title'] ?: $row['course_title'] ?: '');
        // Keep message and internal notes independent to avoid leaking source placeholders.
        $row['internal_notes'] = isset($row['internal_notes']) ? (string) $row['internal_notes'] : '';
        $row['message'] = isset($row['message']) ? (string) $row['message'] : '';

        // Normalize legacy placeholder values so dashboards do not show meaningless notes.
        if (self::is_wordpress_placeholder($row['internal_notes'])) {
            $row['internal_notes'] = '';
        }
        if (self::is_wordpress_placeholder($row['message'])) {
            $row['message'] = '';
        }

        // Legacy dashboard compatibility: expose notes under `comments` too.
        $row['comments'] = $row['internal_notes'];

        foreach (['total_amount', 'deposit_amount', 'due_amount', 'subtotal_amount', 'total_payable_now'] as $key) {
            $row[$key] = isset($row[$key]) && $row[$key] !== null && $row[$key] !== '' ? (float) $row[$key] : null;
        }

        $row['guest_count'] = isset($row['guest_count']) && $row['guest_count'] !== '' ? (int) $row['guest_count'] : null;
        $row['tags'] = self::decode_tags($row['tags'] ?? '');

        return $row;
    }

    private static function sanitize_string($value): string {
        return trim(sanitize_textarea_field(is_scalar($value) ? (string) $value : ''));
    }

    private static function sanitize_date($value): ?string {
        $date = trim((string) $value);
        if ($date === '') {
            return null;
        }
        return preg_match('/^\d{4}-\d{2}-\d{2}$/', $date) ? $date : null;
    }

    private static function sanitize_amount($value): ?float {
        if ($value === null || $value === '') {
            return null;
        }
        $clean = preg_replace('/[^0-9.\-]/', '', (string) $value);
        if ($clean === '' || !is_numeric($clean)) {
            return null;
        }
        return round((float) $clean, 2);
    }

    private static function sanitize_int($value): ?int {
        if ($value === null || $value === '') {
            return null;
        }
        return (int) $value;
    }

    private static function sanitize_tags($value): string {
        if (is_array($value)) {
            $items = array_values(array_filter(array_map([self::class, 'sanitize_string'], $value)));
            return wp_json_encode($items);
        }
        if (is_string($value) && $value !== '') {
            return $value;
        }
        return '[]';
    }

    private static function decode_tags($value): array {
        if (!is_string($value) || $value === '') {
            return [];
        }
        $decoded = json_decode($value, true);
        return is_array($decoded) ? array_values($decoded) : [];
    }

    private static function get_api_key(): string {
        if (defined('KTD_BOOKING_API_KEY') && KTD_BOOKING_API_KEY) {
            return (string) KTD_BOOKING_API_KEY;
        }
        return (string) get_option(self::OPTION_API_KEY, '');
    }

    public static function register_admin_page(): void {
        add_options_page(
            'KTD Booking Manager',
            'KTD Booking Manager',
            'manage_options',
            self::OPTION_PAGE_SLUG,
            [self::class, 'render_admin_page']
        );
    }

    public static function register_settings(): void {
        register_setting('ktd_booking_manager', self::OPTION_API_KEY, [
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default' => '',
        ]);

        add_settings_section(
            'ktd_booking_manager_api',
            'API settings',
            static function (): void {
                echo '<p>Use the same API key here that your frontend and server use for the WordPress booking routes.</p>';
            },
            self::OPTION_PAGE_SLUG
        );

        add_settings_field(
            self::OPTION_API_KEY,
            'REST API key',
            [self::class, 'render_api_key_field'],
            self::OPTION_PAGE_SLUG,
            'ktd_booking_manager_api'
        );
    }

    public static function render_api_key_field(): void {
        $value = self::get_api_key();
        printf(
            '<input type="text" name="%1$s" value="%2$s" class="regular-text" autocomplete="off" />',
            esc_attr(self::OPTION_API_KEY),
            esc_attr($value)
        );
    }

    public static function render_admin_page(): void {
        global $wpdb;

        $bookings_count = (int) $wpdb->get_var("SELECT COUNT(*) FROM " . self::bookings_table());
        $crm_count = (int) $wpdb->get_var("SELECT COUNT(*) FROM " . self::crm_table());
        ?>
        <div class="wrap">
            <h1>KTD Booking Manager</h1>
            <p>Install the plugin, set the API key below, and point your app at <code>/wp-json/ktd/v1</code>.</p>
            <ul>
                <li><strong>Bookings stored:</strong> <?php echo esc_html((string) $bookings_count); ?></li>
                <li><strong>CRM sync events stored:</strong> <?php echo esc_html((string) $crm_count); ?></li>
                <li><strong>REST base:</strong> <code><?php echo esc_html(rest_url('ktd/v1')); ?></code></li>
            </ul>
            <form method="post" action="options.php">
                <?php
                settings_fields('ktd_booking_manager');
                do_settings_sections(self::OPTION_PAGE_SLUG);
                submit_button();
                ?>
            </form>
        </div>
        <?php
    }
}

register_activation_hook(__FILE__, ['KTD_Booking_Manager', 'activate']);
KTD_Booking_Manager::bootstrap();