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
        add_action('admin_init', array($this, 'maybe_upgrade_table'));
        add_shortcode('ktd_booking_form', array($this, 'render_booking_shortcode'));
        add_action('wp_ajax_nopriv_ktd_submit_booking', array($this, 'ajax_submit_booking'));
        add_action('wp_ajax_ktd_submit_booking', array($this, 'ajax_submit_booking'));
        add_action('wp_ajax_ktd_admin_update_status', array($this, 'ajax_admin_update_status'));
        add_action('wp_ajax_ktd_admin_delete_booking', array($this, 'ajax_admin_delete_booking'));
        add_action('wp_ajax_ktd_admin_delete_all_bookings', array($this, 'ajax_admin_delete_all_bookings'));
        add_action('wp_ajax_ktd_admin_save_note', array($this, 'ajax_admin_save_note'));
        add_action('wp_ajax_ktd_admin_save_booking', array($this, 'ajax_admin_save_booking'));
        add_action('wp_ajax_ktd_admin_save_page_content', array($this, 'ajax_save_page_content'));
        add_action('wp_ajax_ktd_admin_delete_page_content', array($this, 'ajax_delete_page_content'));
        add_action('wp_ajax_ktd_admin_add_page_content', array($this, 'ajax_add_page_content'));

        // Contact Form 7 integration
        add_action('wpcf7_mail_sent', array($this, 'handle_cf7_submission'));
    }

    public static function activate() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';

        // Page content table (migrated from Supabase)
        $pc_table = $wpdb->prefix . 'ktd_page_content';
        $sql_pc = "CREATE TABLE {$pc_table} (
            id VARCHAR(36) NOT NULL,
            page_slug VARCHAR(100) NOT NULL,
            locale VARCHAR(10) NOT NULL DEFAULT 'en',
            section_key VARCHAR(255) NOT NULL,
            content_type VARCHAR(50) NOT NULL DEFAULT 'text',
            content_value LONGTEXT,
            updated_by VARCHAR(255) DEFAULT '',
            created_at DATETIME DEFAULT NULL,
            updated_at DATETIME DEFAULT NULL,
            PRIMARY KEY  (id),
            KEY page_slug (page_slug),
            KEY locale (locale),
            KEY slug_locale (page_slug, locale)
        ) {$charset_collate};";
        dbDelta($sql_pc);

        $table_name = $wpdb->prefix . 'ktd_bookings';

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
            nationality VARCHAR(100) DEFAULT '',
            accommodation VARCHAR(100) DEFAULT '',
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
            raw_payload LONGTEXT,
            PRIMARY KEY  (id),
            KEY status (status),
            KEY booking_type (booking_type),
            KEY created_at (created_at)
        ) {$charset_collate};";

        dbDelta($sql);
    }

    public function maybe_upgrade_table() {
        global $wpdb;
        $col = $wpdb->get_results("SHOW COLUMNS FROM {$this->table_name} LIKE 'internal_notes'");
        if (empty($col)) {
            $wpdb->query("ALTER TABLE {$this->table_name} ADD COLUMN internal_notes TEXT AFTER message");
        }
        $nat = $wpdb->get_results("SHOW COLUMNS FROM {$this->table_name} LIKE 'nationality'");
        if (empty($nat)) {
            $wpdb->query("ALTER TABLE {$this->table_name} ADD COLUMN nationality VARCHAR(100) DEFAULT '' AFTER phone");
        }
        $acc = $wpdb->get_results("SHOW COLUMNS FROM {$this->table_name} LIKE 'accommodation'");
        if (empty($acc)) {
            $wpdb->query("ALTER TABLE {$this->table_name} ADD COLUMN accommodation VARCHAR(100) DEFAULT '' AFTER nationality");
        }
    }

    public function register_settings() {
        register_setting('ktd_booking_settings', $this->option_key);
    }

    private function maybe_send_confirmation_email(array $booking, string $new_status, string $previous_status) {
        if ($new_status !== 'confirmed' || $previous_status === 'confirmed') {
            return;
        }

        $to = sanitize_email($booking['email'] ?? '');
        if ($to === '') {
            return;
        }

        $name = sanitize_text_field($booking['name'] ?? 'Diver');
        $first_name = explode(' ', $name)[0];
        $item_title = sanitize_text_field($booking['item_title'] ?? 'Diving Package');
        $preferred_date = sanitize_text_field($booking['preferred_date'] ?? '');
        $date_row = $preferred_date !== '' ? "<tr style=\"border-bottom:1px solid #e8edf2;\"><td style=\"padding:10px 14px;font-weight:600;color:#1a3a5c;width:160px;\">Date</td><td style=\"padding:10px 14px;color:#374151;\">{$preferred_date}</td></tr>" : '';

        $subject = 'Booking Confirmed - Pro Diving Asia';
        $message = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>' .
            '<body style="margin:0;padding:0;background:#f0f4f8;font-family:\'Segoe UI\',Arial,sans-serif;">' .
            '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:32px 0;"><tr><td align="center">' .
            '<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(11,61,145,0.10);">' .

            '<tr><td style="background:linear-gradient(135deg,#0b3d91 0%,#1a5ed4 100%);padding:0;">' .
            '<table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:28px 32px 0 32px;">' .
            '<table width="100%" cellpadding="0" cellspacing="0"><tr>' .
            '<td><span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:1px;">🤿 PRO DIVING ASIA</span></td>' .
            '<td align="right"><span style="background:rgba(255,255,255,0.18);color:#fff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;letter-spacing:1px;">✅ BOOKING CONFIRMED</span></td>' .
            '</tr></table></td></tr>' .
            '<tr><td style="padding:18px 32px 32px 32px;text-align:center;">' .
            '<div style="font-size:48px;margin-bottom:8px;">✅</div>' .
            '<h1 style="margin:0 0 6px;color:#ffffff;font-size:24px;font-weight:700;">You\'re Confirmed!</h1>' .
            '<p style="margin:0;color:rgba(255,255,255,0.85);font-size:14px;">' . esc_html($item_title) . '</p>' .
            '</td></tr></table></td></tr>' .

            '<tr><td style="padding:32px;">' .
            '<p style="margin:0 0 20px;color:#374151;font-size:15px;">Hi ' . esc_html($first_name) . ', great news — your booking is officially confirmed. We\'re looking forward to diving with you!</p>' .

            '<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8edf2;border-radius:8px;overflow:hidden;margin-bottom:24px;">' .
            '<tr style="border-bottom:1px solid #e8edf2;"><td style="padding:10px 14px;font-weight:600;color:#1a3a5c;width:160px;">Activity</td><td style="padding:10px 14px;color:#374151;">' . esc_html($item_title) . '</td></tr>' .
            $date_row .
            '</table>' .

            '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7ff;border-radius:8px;padding:0;margin-bottom:24px;"><tr><td style="padding:20px 24px;">' .
            '<p style="margin:0 0 12px;font-weight:700;color:#1a3a5c;font-size:14px;">WHAT HAPPENS NEXT</p>' .
            '<p style="margin:0 0 8px;color:#374151;font-size:14px;">📍 We\'ll be in touch to confirm exact meeting point and time.</p>' .
            '<p style="margin:0 0 8px;color:#374151;font-size:14px;">📋 Please bring any relevant certification cards on the day.</p>' .
            '<p style="margin:0;color:#374151;font-size:14px;">💬 Questions? WhatsApp or reply to this email anytime.</p>' .
            '</td></tr></table>' .

            '<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">' .
            '<a href="https://wa.me/66894430234" style="display:inline-block;background:#25d366;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;">💬 WhatsApp Us</a>' .
            '</td></tr></table>' .
            '</td></tr>' .

            '<tr><td style="background:#f8fafc;border-top:1px solid #e8edf2;padding:20px 32px;text-align:center;">' .
            '<p style="margin:0;color:#6b7280;font-size:12px;">Pro Diving Asia · Koh Tao, Thailand · <a href="https://www.divinginasia.com" style="color:#1a5ed4;text-decoration:none;">divinginasia.com</a></p>' .
            '</td></tr>' .

            '</table></td></tr></table></body></html>';

        $headers = array('Content-Type: text/html; charset=UTF-8');
        wp_mail($to, $subject, $message, $headers);
    }

    public function ajax_admin_update_status() {
        check_ajax_referer('ktd_admin_nonce', 'nonce');
        if (!current_user_can('manage_options')) { wp_send_json_error('Forbidden', 403); }
        $id     = absint($_POST['id'] ?? 0);
        $status = sanitize_text_field($_POST['status'] ?? '');
        $allowed = array('new','pending','confirmed','completed','cancelled');
        if (!$id || !in_array($status, $allowed, true)) { wp_send_json_error('Invalid input', 400); }
        global $wpdb;

        $existing = $wpdb->get_row($wpdb->prepare("SELECT id, name, email, item_title, preferred_date, status FROM {$this->table_name} WHERE id = %d", $id), ARRAY_A);
        if (!$existing) {
            wp_send_json_error('Booking not found', 404);
        }
        $previous_status = sanitize_text_field($existing['status'] ?? '');

        $updated = $wpdb->update($this->table_name, array('status' => $status, 'updated_at' => current_time('mysql')), array('id' => $id), array('%s','%s'), array('%d'));
        if ($updated === false) { wp_send_json_error('DB error: ' . $wpdb->last_error, 500); }

        $existing['status'] = $status;
        $this->maybe_send_confirmation_email($existing, $status, $previous_status);

        wp_send_json_success(array('id' => $id, 'status' => $status));
    }

    public function ajax_admin_delete_booking() {
        check_ajax_referer('ktd_admin_nonce', 'nonce');
        if (!current_user_can('manage_options')) { wp_send_json_error('Forbidden', 403); }
        $id = absint($_POST['id'] ?? 0);
        if (!$id) { wp_send_json_error('Invalid ID', 400); }
        global $wpdb;
        $deleted = $wpdb->delete($this->table_name, array('id' => $id), array('%d'));
        if ($deleted === false) { wp_send_json_error('DB error: ' . $wpdb->last_error, 500); }
        wp_send_json_success(array('id' => $id));
    }

    public function ajax_admin_delete_all_bookings() {
        check_ajax_referer('ktd_admin_nonce', 'nonce');
        if (!current_user_can('manage_options')) { wp_send_json_error('Forbidden', 403); }
        global $wpdb;
        $wpdb->query("TRUNCATE TABLE {$this->table_name}");
        wp_send_json_success(array('deleted' => true));
    }

    public function ajax_admin_save_note() {
        check_ajax_referer('ktd_admin_nonce', 'nonce');
        if (!current_user_can('manage_options')) { wp_send_json_error('Forbidden', 403); }
        $id   = absint($_POST['id'] ?? 0);
        $note = sanitize_textarea_field($_POST['note'] ?? '');
        if (!$id) { wp_send_json_error('Invalid ID', 400); }
        global $wpdb;
        $updated = $wpdb->update($this->table_name, array('internal_notes' => $note, 'updated_at' => current_time('mysql')), array('id' => $id), array('%s','%s'), array('%d'));
        if ($updated === false) { wp_send_json_error('DB error: ' . $wpdb->last_error, 500); }
        wp_send_json_success(array('id' => $id, 'note' => $note));
    }

    public function ajax_admin_save_booking() {
        check_ajax_referer('ktd_admin_nonce', 'nonce');
        if (!current_user_can('manage_options')) { wp_send_json_error('Forbidden', 403); }

        $id = absint($_POST['id'] ?? 0);
        if (!$id) { wp_send_json_error('Invalid ID', 400); }

        global $wpdb;
        $existing = $wpdb->get_row($wpdb->prepare("SELECT id, status FROM {$this->table_name} WHERE id = %d", $id), ARRAY_A);
        if (!$existing) {
            wp_send_json_error('Booking not found', 404);
        }
        $previous_status = sanitize_text_field($existing['status'] ?? '');

        $status = sanitize_text_field($_POST['status'] ?? 'new');
        $allowed_status = array('new', 'pending', 'confirmed', 'completed', 'cancelled');
        if (!in_array($status, $allowed_status, true)) {
            $status = 'new';
        }
        $mark_deposit_received = absint($_POST['mark_deposit_received'] ?? 0) === 1;

        $payload = array(
            'name' => sanitize_text_field($_POST['name'] ?? ''),
            'email' => sanitize_email($_POST['email'] ?? ''),
            'phone' => sanitize_text_field($_POST['phone'] ?? ''),
            'nationality' => sanitize_text_field($_POST['nationality'] ?? ''),
            'accommodation' => sanitize_text_field($_POST['accommodation'] ?? ''),
            'item_title' => sanitize_text_field($_POST['item_title'] ?? ''),
            'preferred_date' => sanitize_text_field($_POST['preferred_date'] ?? ''),
            'payment_choice' => sanitize_text_field($_POST['payment_choice'] ?? ''),
            'status' => $status,
            'internal_notes' => sanitize_textarea_field($_POST['internal_notes'] ?? ''),
            'updated_at' => current_time('mysql'),
        );

        // Auto-confirm bookings when staff marks the deposit as received.
        if ($mark_deposit_received) {
            $payload['payment_choice'] = 'deposit_received';
            if (in_array($status, array('new', 'pending'), true)) {
                $payload['status'] = 'confirmed';
            }
        }

        $updated = $wpdb->update(
            $this->table_name,
            $payload,
            array('id' => $id),
            array('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s'),
            array('%d')
        );

        if ($updated === false) {
            wp_send_json_error('DB error: ' . $wpdb->last_error, 500);
        }

        $booking_for_email = array(
            'name' => $payload['name'],
            'email' => $payload['email'],
            'item_title' => $payload['item_title'],
            'preferred_date' => $payload['preferred_date'],
            'status' => $payload['status'],
        );
        $this->maybe_send_confirmation_email($booking_for_email, $payload['status'], $previous_status);

        wp_send_json_success(array('id' => $id, 'status' => $payload['status'], 'payment_choice' => $payload['payment_choice']));
    }

    public function register_rest_routes() {
        // Page content endpoints
        register_rest_route('ktd/v1', '/page-content', array(
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => array($this, 'get_page_content'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('ktd/v1', '/page-content/import', array(
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => array($this, 'import_page_content'),
            'permission_callback' => array($this, 'validate_api_key'),
        ));

        // Booking endpoints
        register_rest_route('ktd/v1', '/bookings/create', array(
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => array($this, 'create_booking'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('ktd/v1', '/bookings', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array($this, 'list_bookings'),
            'permission_callback' => function ($request) {
                // Allow WP admins OR valid API key
                if (current_user_can('manage_options')) {
                    return true;
                }
                $expected = trim((string) get_option($this->option_key, ''));
                if ($expected === '') {
                    return false;
                }
                $provided = trim((string) $request->get_header('x-ktd-api-key'));
                return $provided !== '' && hash_equals($expected, $provided);
            },
        ));

        register_rest_route('ktd/v1', '/bookings/(?P<id>\d+)/amounts', array(
            'methods' => 'PATCH',
            'callback' => array($this, 'update_booking_amounts'),
            'args' => array(
                'id' => array('validate_callback' => function($v) { return is_numeric($v); }),
            ),
            'permission_callback' => array($this, 'validate_api_key'),
        ));

        register_rest_route('ktd/v1', '/bookings/bulk-update-amounts', array(
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => array($this, 'bulk_update_booking_amounts'),
            'permission_callback' => array($this, 'validate_api_key'),
        ));

        // Update any booking fields (status, internal_notes, name, email, phone, preferred_date, etc.)
        register_rest_route('ktd/v1', '/bookings/(?P<id>\d+)', array(
            'methods' => 'PATCH',
            'callback' => array($this, 'update_booking'),
            'args' => array(
                'id' => array('validate_callback' => function($v) { return is_numeric($v); }),
            ),
            'permission_callback' => array($this, 'validate_api_key'),
        ));

        // Delete a booking
        register_rest_route('ktd/v1', '/bookings/(?P<id>\d+)', array(
            'methods' => 'DELETE',
            'callback' => array($this, 'delete_booking'),
            'args' => array(
                'id' => array('validate_callback' => function($v) { return is_numeric($v); }),
            ),
            'permission_callback' => array($this, 'validate_api_key'),
        ));
    }

    public function update_booking($request) {
        global $wpdb;
        $id = (int) $request->get_param('id');
        if (!$id) {
            return new WP_Error('invalid_id', 'Invalid booking ID', array('status' => 400));
        }
        $body = $request->get_json_params() ?: array();

        $allowed = array(
            'status'                => '%s',
            'internal_notes'        => '%s',
            'name'                  => '%s',
            'email'                 => '%s',
            'phone'                 => '%s',
            'preferred_date'        => '%s',
            'item_title'            => '%s',
            'booking_type'          => '%s',
            'nationality'           => '%s',
            'accommodation'         => '%s',
            'message'               => '%s',
            'paypal_link'           => '%s',
            'total_amount'          => '%f',
            'deposit_amount'        => '%f',
            'due_amount'            => '%f',
        );

        $update  = array('updated_at' => current_time('mysql'));
        $formats = array('%s');

        foreach ($allowed as $field => $fmt) {
            if (!array_key_exists($field, $body)) continue;
            if (in_array($fmt, array('%f'), true)) {
                $update[$field] = $this->normalize_number($body[$field]);
            } else {
                $update[$field] = sanitize_textarea_field((string) $body[$field]);
            }
            $formats[] = $fmt;
        }

        if (count($update) <= 1) {
            return new WP_Error('no_fields', 'No valid fields to update', array('status' => 400));
        }

        // Grab previous status for email trigger
        $previous = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$this->table_name} WHERE id = %d", $id), ARRAY_A);

        $result = $wpdb->update($this->table_name, $update, array('id' => $id), $formats, array('%d'));
        if ($result === false) {
            return new WP_Error('db_error', 'DB update failed: ' . $wpdb->last_error, array('status' => 500));
        }

        // Send confirmation email if status changed to confirmed
        if (isset($update['status']) && $previous) {
            $merged = array_merge($previous, $update);
            $this->maybe_send_confirmation_email($merged, $update['status'], $previous['status'] ?? '');
        }

        $row = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$this->table_name} WHERE id = %d", $id), ARRAY_A);
        return rest_ensure_response(array('ok' => true, 'booking' => $row));
    }

    public function delete_booking($request) {
        global $wpdb;
        $id = (int) $request->get_param('id');
        if (!$id) {
            return new WP_Error('invalid_id', 'Invalid booking ID', array('status' => 400));
        }
        $result = $wpdb->delete($this->table_name, array('id' => $id), array('%d'));
        if ($result === false) {
            return new WP_Error('db_error', 'Delete failed: ' . $wpdb->last_error, array('status' => 500));
        }
        return rest_ensure_response(array('ok' => true, 'deleted' => $id));
    }

    public function update_booking_amounts($request) {
        global $wpdb;
        $id = (int) $request->get_param('id');
        $body = $request->get_json_params() ?: array();

        $update = array('updated_at' => current_time('mysql'));
        $formats = array('%s');

        if (isset($body['total_amount'])) {
            $update['total_amount'] = $this->normalize_number($body['total_amount']);
            $formats[] = '%f';
        }
        if (isset($body['deposit_amount'])) {
            $update['deposit_amount'] = $this->normalize_number($body['deposit_amount']);
            $formats[] = '%f';
        }
        if (isset($body['due_amount'])) {
            $update['due_amount'] = $this->normalize_number($body['due_amount']);
            $formats[] = '%f';
        }

        $result = $wpdb->update($this->table_name, $update, array('id' => $id), $formats, array('%d'));
        if ($result === false) {
            return new WP_Error('db_error', 'DB update failed: ' . $wpdb->last_error, array('status' => 500));
        }
        return rest_ensure_response(array('ok' => true, 'id' => $id, 'updated' => $result));
    }

    public function bulk_update_booking_amounts($request) {
        global $wpdb;
        $body = $request->get_json_params() ?: array();
        $rows = isset($body['bookings']) ? $body['bookings'] : array();

        if (empty($rows) || !is_array($rows)) {
            return new WP_Error('invalid_input', 'Expected { bookings: [ {id, total_amount, deposit_amount, due_amount} ] }', array('status' => 400));
        }

        $updated = 0;
        $errors = array();
        foreach ($rows as $row) {
            $id = isset($row['id']) ? (int) $row['id'] : 0;
            if (!$id) continue;

            $update = array('updated_at' => current_time('mysql'));
            $formats = array('%s');
            if (isset($row['total_amount'])) { $update['total_amount'] = $this->normalize_number($row['total_amount']); $formats[] = '%f'; }
            if (isset($row['deposit_amount'])) { $update['deposit_amount'] = $this->normalize_number($row['deposit_amount']); $formats[] = '%f'; }
            if (isset($row['due_amount'])) { $update['due_amount'] = $this->normalize_number($row['due_amount']); $formats[] = '%f'; }

            $result = $wpdb->update($this->table_name, $update, array('id' => $id), $formats, array('%d'));
            if ($result === false) {
                $errors[] = $id;
            } else {
                $updated++;
            }
        }

        return rest_ensure_response(array('ok' => true, 'updated' => $updated, 'errors' => $errors));
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
                'nationality' => sanitize_text_field($payload['nationality'] ?? ''),
                'accommodation' => sanitize_text_field($payload['accommodation'] ?? ''),
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
                'internal_notes' => sanitize_textarea_field($payload['internal_notes'] ?? $payload['message'] ?? ''),
                'raw_payload' => wp_json_encode($payload),
            ),
            array(
                '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%d', '%d', '%s', '%s', '%s', '%f', '%f', '%f', '%s', '%s', '%s', '%s', '%s', '%s'
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
        wp_cache_flush();
        $rows = $wpdb->get_results("SELECT SQL_NO_CACHE * FROM {$this->table_name} ORDER BY id DESC LIMIT 500", ARRAY_A);
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
        add_submenu_page(
            'ktd-bookings',
            'Page Content',
            'Page Content',
            'manage_options',
            'ktd-page-content',
            array($this, 'render_page_content_admin')
        );
    }

    public function render_admin_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        global $wpdb;
        $rows = $wpdb->get_results("SELECT * FROM {$this->table_name} ORDER BY created_at DESC LIMIT 300", ARRAY_A);
        $admin_nonce = wp_create_nonce('ktd_admin_nonce');
        $ajax_url    = admin_url('admin-ajax.php');
        ?>
        <div class="wrap ktd-admin-wrap">
            <h1>Koh Tao Booking Panel</h1>

            <style>
                .ktd-admin-wrap { --ktd-blue:#0b5fff; --ktd-sky:#eaf1ff; --ktd-green:#137333; --ktd-red:#b3261e; }
                .ktd-grid { display:grid; grid-template-columns:repeat(4,minmax(140px,1fr)); gap:12px; margin:14px 0 18px; }
                .ktd-card { background:#fff; border:1px solid #d6def5; border-radius:10px; padding:12px; }
                .ktd-card h3 { margin:0; font-size:12px; text-transform:uppercase; color:#5b6480; }
                .ktd-card .num { margin-top:8px; font-size:26px; font-weight:700; color:#111827; }
                .ktd-toolbar { background:#fff; border:1px solid #d6def5; border-radius:10px; padding:12px; margin-bottom:12px; display:flex; flex-wrap:wrap; gap:10px; align-items:center; }
                .ktd-toolbar input, .ktd-toolbar select { min-height:34px; border:1px solid #c9d3f2; border-radius:7px; padding:0 10px; }
                .ktd-btn { border:1px solid #c9d3f2; border-radius:7px; background:#fff; min-height:34px; padding:0 12px; cursor:pointer; }
                .ktd-btn-primary { background:var(--ktd-blue); color:#fff; border-color:var(--ktd-blue); }
                .ktd-btn-danger { color:var(--ktd-red); border-color:#f3c7c2; background:#fff; }
                .ktd-pill { display:inline-flex; align-items:center; border-radius:999px; font-size:11px; padding:3px 9px; }
                .ktd-pill.new{ background:#eaf1ff; color:#2247b7; }
                .ktd-pill.pending{ background:#fff4dc; color:#8a5a00; }
                .ktd-pill.confirmed{ background:#e8f8ee; color:#1b7a3f; }
                .ktd-pill.completed{ background:#ddeefe; color:#1f4f8c; }
                .ktd-pill.cancelled{ background:#fce8e6; color:#b3261e; }
                .ktd-table-wrap { background:#fff; border:1px solid #d6def5; border-radius:10px; overflow:auto; }
                .ktd-table { min-width:1200px; border-collapse:collapse; }
                .ktd-table th { background:#f5f8ff; border-bottom:1px solid #d6def5; text-align:left; padding:10px 8px; font-size:12px; }
                .ktd-table td { border-bottom:1px solid #eef2ff; padding:8px; vertical-align:top; }
                .ktd-table input, .ktd-table textarea, .ktd-table select { width:100%; border:1px solid #d5dcf5; border-radius:6px; padding:6px 8px; font-size:12px; }
                .ktd-row-actions { display:flex; gap:6px; flex-wrap:wrap; }
                #ktd-admin-msg { display:none; padding:9px 12px; border-radius:8px; margin:0 0 12px; font-weight:600; }
            </style>

            <?php
            $status_counts = array('new' => 0, 'pending' => 0, 'confirmed' => 0, 'completed' => 0, 'cancelled' => 0);
            foreach ($rows as $row_stat) {
                $s = $row_stat['status'] ?? 'new';
                if (isset($status_counts[$s])) {
                    $status_counts[$s]++;
                }
            }
            ?>
            <div class="ktd-grid">
                <div class="ktd-card"><h3>Total</h3><div class="num"><?php echo (int) count($rows); ?></div></div>
                <div class="ktd-card"><h3>New</h3><div class="num"><?php echo (int) $status_counts['new']; ?></div></div>
                <div class="ktd-card"><h3>Pending</h3><div class="num"><?php echo (int) $status_counts['pending']; ?></div></div>
                <div class="ktd-card"><h3>Confirmed</h3><div class="num"><?php echo (int) $status_counts['confirmed']; ?></div></div>
            </div>

            <form method="post" action="options.php" style="margin:0 0 12px;padding:12px;background:#fff;border:1px solid #d6def5;border-radius:10px;max-width:720px;">
                <h2 style="margin:0 0 8px;">API Settings</h2>
                <?php settings_fields('ktd_booking_settings'); ?>
                <table class="form-table" role="presentation" style="margin:0;">
                    <tr>
                        <th scope="row" style="width:170px;"><label for="<?php echo esc_attr($this->option_key); ?>">Booking API Key</label></th>
                        <td>
                            <input type="text" id="<?php echo esc_attr($this->option_key); ?>" name="<?php echo esc_attr($this->option_key); ?>" value="<?php echo esc_attr(get_option($this->option_key, '')); ?>" class="regular-text" />
                            <p class="description">Use this key as header: x-ktd-api-key</p>
                        </td>
                    </tr>
                </table>
                <?php submit_button('Save API Key'); ?>
            </form>

            <div class="ktd-toolbar">
                <input type="text" id="ktd-search" placeholder="Search name, email, phone, course..." />
                <select id="ktd-filter-status">
                    <option value="">All statuses</option>
                    <option value="new">New</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <input type="date" id="ktd-date-from" />
                <input type="date" id="ktd-date-to" />
                <button type="button" class="ktd-btn" id="ktd-reset-filters">Reset</button>
                <button type="button" class="ktd-btn ktd-btn-primary" id="ktd-export-csv">Export CSV</button>
                <button type="button" class="ktd-btn ktd-btn-danger" id="ktd-delete-all">🗑 Delete All</button>
            </div>

            <p id="ktd-admin-msg"></p>

            <div class="ktd-table-wrap">
                <table class="widefat striped ktd-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Course</th>
                            <th>Accommodation</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Experience</th>
                            <th>Deposit / Total</th>
                            <th>Pay Link</th>
                            <th>Message</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="ktd-bookings-tbody">
                    <?php if (empty($rows)) : ?>
                        <tr><td colspan="13">No bookings found.</td></tr>
                    <?php else : ?>
                        <?php foreach ($rows as $row) :
                            $status_opts = array('new','pending','confirmed','completed','cancelled');
                            $row_date = substr((string)($row['created_at'] ?? ''), 0, 10);
                        ?>
                            <tr
                                id="ktd-row-<?php echo (int) $row['id']; ?>"
                                data-id="<?php echo (int) $row['id']; ?>"
                                data-status="<?php echo esc_attr($row['status'] ?? ''); ?>"
                                data-date="<?php echo esc_attr($row_date); ?>"
                                data-search="<?php echo esc_attr(strtolower(trim(($row['name'] ?? '') . ' ' . ($row['email'] ?? '') . ' ' . ($row['phone'] ?? '') . ' ' . ($row['item_title'] ?? '')))); ?>"
                            >
                                <td><?php echo (int) $row['id']; ?></td>
                                <td><input class="ktd-field" data-field="name" value="<?php echo esc_attr($row['name'] ?? ''); ?>" /></td>
                                <td><input class="ktd-field" data-field="email" value="<?php echo esc_attr($row['email'] ?? ''); ?>" /></td>
                                <td><input class="ktd-field" data-field="phone" value="<?php echo esc_attr($row['phone'] ?? ''); ?>" /></td>
                                <td><input class="ktd-field" data-field="item_title" value="<?php echo esc_attr($row['item_title'] ?? ''); ?>" /></td>
                                <td><input class="ktd-field" data-field="accommodation" value="<?php echo esc_attr($row['accommodation'] ?? ''); ?>" /></td>
                                <td><input class="ktd-field" data-field="preferred_date" value="<?php echo esc_attr($row['preferred_date'] ?? ''); ?>" /></td>
                                <td style="white-space:nowrap;font-size:12px;"><?php echo esc_html($row['booking_type'] ?? ''); ?></td>
                                <td style="font-size:12px;"><?php echo esc_html($row['experience_level'] ?? ''); ?></td>
                                <td style="white-space:nowrap;font-size:12px;">
                                    <?php
                                    $dep = isset($row['deposit_amount']) && $row['deposit_amount'] !== null && $row['deposit_amount'] !== '' ? number_format((float)$row['deposit_amount'], 0) : null;
                                    $tot = isset($row['total_amount']) && $row['total_amount'] !== null && $row['total_amount'] !== '' ? number_format((float)$row['total_amount'], 0) : null;
                                    $bal = isset($row['due_amount']) && $row['due_amount'] !== null && $row['due_amount'] !== '' ? number_format((float)$row['due_amount'], 0) : null;
                                    ?>
                                    <?php if ($dep !== null) : ?>Dep: ฿<?php echo esc_html($dep); ?><br><?php endif; ?>
                                    <?php if ($tot !== null) : ?>Tot: ฿<?php echo esc_html($tot); ?><br><?php endif; ?>
                                    <?php if ($bal !== null) : ?>Bal: ฿<?php echo esc_html($bal); ?><?php endif; ?>
                                    <?php if ($dep === null && $tot === null) : ?>-<?php endif; ?>
                                    <label style="display:block;margin-top:6px;font-size:11px;">
                                        <input type="checkbox" class="ktd-field" data-field="mark_deposit_received" value="1" />
                                        Dep received
                                    </label>
                                </td>
                                <td style="font-size:12px;">
                                    <?php $pl = $row['paypal_link'] ?? ''; ?>
                                    <?php if ($pl) : ?><a href="<?php echo esc_url($pl); ?>" target="_blank" style="color:#1a5ed4;">Link</a><?php else : ?>-<?php endif; ?>
                                </td>
                                <td>
                                    <textarea class="ktd-field" data-field="internal_notes" rows="2"><?php echo esc_textarea($row['internal_notes'] ?? ''); ?></textarea>
                                </td>
                                <td>
                                    <span class="ktd-pill <?php echo esc_attr($row['status'] ?? 'new'); ?>"><?php echo esc_html(ucfirst($row['status'] ?? 'new')); ?></span>
                                    <select class="ktd-field" data-field="status" style="margin-top:6px;">
                                        <?php foreach ($status_opts as $s) : ?>
                                            <option value="<?php echo esc_attr($s); ?>" <?php selected($row['status'], $s); ?>><?php echo esc_html(ucfirst($s)); ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </td>
                                <td>
                                    <div class="ktd-row-actions">
                                        <button class="ktd-btn ktd-btn-primary ktd-save-row" data-id="<?php echo (int)$row['id']; ?>" type="button">Save</button>
                                        <button class="ktd-btn ktd-btn-danger ktd-delete-booking" data-id="<?php echo (int)$row['id']; ?>" type="button">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <script>
        (function(){
            var ajaxUrl = '<?php echo esc_js($ajax_url); ?>';
            var nonce   = '<?php echo esc_js($admin_nonce); ?>';

            function showMsg(msg, ok) {
                var el = document.getElementById('ktd-admin-msg');
                el.textContent = msg;
                el.style.background = ok ? '#e6ffe6' : '#ffe0e0';
                el.style.color = ok ? '#1a4d1a' : '#7a0000';
                el.style.display = 'block';
                setTimeout(function(){ el.style.display = 'none'; }, 3000);
            }

            function post(action, body, cb) {
                var fd = new FormData();
                fd.append('action', action);
                fd.append('nonce', nonce);
                for (var k in body) { fd.append(k, body[k]); }
                fetch(ajaxUrl, { method:'POST', body: fd })
                    .then(function(r){ return r.json(); })
                    .then(cb)
                    .catch(function(){ showMsg('Request failed', false); });
            }

            function parseDate(d) {
                if (!d) return null;
                var t = new Date(d + 'T00:00:00');
                return isNaN(t.getTime()) ? null : t;
            }

            function applyFilters() {
                var q = (document.getElementById('ktd-search').value || '').toLowerCase().trim();
                var status = document.getElementById('ktd-filter-status').value || '';
                var from = parseDate(document.getElementById('ktd-date-from').value || '');
                var to = parseDate(document.getElementById('ktd-date-to').value || '');
                if (to) to.setHours(23, 59, 59, 999);

                document.querySelectorAll('#ktd-bookings-tbody tr[data-id]').forEach(function(row){
                    var rowStatus = row.getAttribute('data-status') || '';
                    var hay = row.getAttribute('data-search') || '';
                    var rowDateRaw = row.getAttribute('data-date') || '';
                    var rowDate = parseDate(rowDateRaw);

                    var okStatus = !status || rowStatus === status;
                    var okSearch = !q || hay.indexOf(q) !== -1;
                    var okFrom = !from || (rowDate && rowDate >= from);
                    var okTo = !to || (rowDate && rowDate <= to);

                    row.style.display = (okStatus && okSearch && okFrom && okTo) ? '' : 'none';
                });
            }

            document.getElementById('ktd-search').addEventListener('input', applyFilters);
            document.getElementById('ktd-filter-status').addEventListener('change', applyFilters);
            document.getElementById('ktd-date-from').addEventListener('change', applyFilters);
            document.getElementById('ktd-date-to').addEventListener('change', applyFilters);
            document.getElementById('ktd-reset-filters').addEventListener('click', function(){
                document.getElementById('ktd-search').value = '';
                document.getElementById('ktd-filter-status').value = '';
                document.getElementById('ktd-date-from').value = '';
                document.getElementById('ktd-date-to').value = '';
                applyFilters();
            });

            document.getElementById('ktd-export-csv').addEventListener('click', function(){
                var lines = ['id,date,status,name,email,phone,nationality,accommodation,course,preferred_date,payment_choice,deposit,total,notes'];
                document.querySelectorAll('#ktd-bookings-tbody tr[data-id]').forEach(function(row){
                    if (row.style.display === 'none') return;
                    var get = function(sel){
                        var el = row.querySelector(sel);
                        return el ? String(el.value || '').replace(/"/g, '""') : '';
                    };
                    var cols = [
                        row.getAttribute('data-id') || '',
                        row.getAttribute('data-date') || '',
                        get('[data-field="status"]'),
                        get('[data-field="name"]'),
                        get('[data-field="email"]'),
                        get('[data-field="phone"]'),
                        get('[data-field="nationality"]'),
                        get('[data-field="accommodation"]'),
                        get('[data-field="item_title"]'),
                        get('[data-field="preferred_date"]'),
                        get('[data-field="payment_choice"]'),
                        row.cells[11] ? row.cells[11].innerText.replace(/\n/g, ' ').trim() : '',
                        '',
                        get('[data-field="internal_notes"]')
                    ];
                    lines.push(cols.map(function(v){ return '"' + v + '"'; }).join(','));
                });
                var blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = 'ktd-bookings.csv';
                a.click();
                URL.revokeObjectURL(url);
            });

            document.querySelectorAll('.ktd-save-row').forEach(function(btn){
                btn.addEventListener('click', function(){
                    var id = this.dataset.id;
                    var row = document.getElementById('ktd-row-' + id);
                    if (!row) return;

                    var payload = { id: id };
                    row.querySelectorAll('.ktd-field').forEach(function(field){
                        if (field.type === 'checkbox') {
                            payload[field.getAttribute('data-field')] = field.checked ? '1' : '0';
                        } else {
                            payload[field.getAttribute('data-field')] = field.value || '';
                        }
                    });

                    post('ktd_admin_save_booking', payload, function(res){
                        if (res.success) {
                            var effectiveStatus = (res.data && res.data.status) ? res.data.status : (payload.status || 'new');
                            row.setAttribute('data-status', effectiveStatus);
                            row.setAttribute('data-search', ((payload.name || '') + ' ' + (payload.email || '') + ' ' + (payload.phone || '') + ' ' + (payload.item_title || '')).toLowerCase().trim());
                            var pill = row.querySelector('.ktd-pill');
                            if (pill) {
                                pill.className = 'ktd-pill ' + effectiveStatus;
                                pill.textContent = effectiveStatus.charAt(0).toUpperCase() + effectiveStatus.slice(1);
                            }
                            var paymentInput = row.querySelector('[data-field="payment_choice"]');
                            if (paymentInput && res.data && res.data.payment_choice) {
                                paymentInput.value = res.data.payment_choice;
                            }
                            var depositCheckbox = row.querySelector('[data-field="mark_deposit_received"]');
                            if (depositCheckbox) {
                                depositCheckbox.checked = false;
                            }
                            showMsg('Booking #' + id + ' saved', true);
                            applyFilters();
                        } else {
                            showMsg(res.data || 'Failed to save booking', false);
                        }
                    });
                });
            });

            document.querySelectorAll('.ktd-delete-booking').forEach(function(btn){
                btn.addEventListener('click', function(){
                    var id = this.dataset.id;
                    if (!confirm('Delete booking #'+id+'? This cannot be undone.')) return;
                    post('ktd_admin_delete_booking', { id: id }, function(res){
                        if (res.success) {
                            var row = document.getElementById('ktd-row-'+id);
                            if (row) row.remove();
                            showMsg('Booking #'+id+' deleted', true);
                        } else { showMsg(res.data || 'Failed', false); }
                    });
                });
            });

            document.getElementById('ktd-delete-all').addEventListener('click', function(){
                if (!confirm('Delete ALL bookings? This cannot be undone.')) return;
                post('ktd_admin_delete_all_bookings', {}, function(res){
                    if (res.success) {
                        document.querySelectorAll('#ktd-bookings-tbody tr[data-id]').forEach(function(r){ r.remove(); });
                        showMsg('All bookings deleted', true);
                    } else { showMsg(res.data || 'Failed', false); }
                });
            });

            applyFilters();
        })();
        </script>
        <?php
    }

    public function ajax_submit_booking() {
        // Verify nonce — but don't die, just reject gracefully (cached pages may have stale nonces)
        $nonce = sanitize_text_field($_POST['nonce'] ?? '');
        if (!wp_verify_nonce($nonce, 'ktd_booking_nonce')) {
            wp_send_json_error('Security check failed. Please refresh the page and try again.', 403);
            return;
        }

        $name  = sanitize_text_field($_POST['name'] ?? '');
        $email = sanitize_email($_POST['email'] ?? '');
        if ($name === '' || $email === '') {
            wp_send_json_error('Name and email are required.', 400);
        }

        $course_prices = array(
            'Open Water'          => 12000,
            'Advanced Open Water' => 11000,
            'Rescue Diver'        => 13000,
            'Divemaster'          => 35000,
            'Fun Dive'            => 1800,
        );
        $course  = sanitize_text_field($_POST['course_title'] ?? '');
        $price   = $course_prices[$course] ?? 0;
        $deposit = ($course === 'Fun Dive') ? 360 : ($price ? round($price * 0.2) : 0);

        global $wpdb;
        $now = current_time('mysql');
        $wpdb->insert(
            $this->table_name,
            array(
                'created_at'      => $now,
                'updated_at'      => $now,
                'status'          => 'new',
                'booking_type'    => 'course',
                'item_title'      => $course,
                'name'            => $name,
                'email'           => $email,
                'phone'           => sanitize_text_field($_POST['phone'] ?? ''),
                'preferred_date'  => sanitize_text_field($_POST['arrival_date'] ?? ''),
                'experience_level'=> sanitize_text_field($_POST['diving_experience'] ?? ''),
                'payment_choice'  => sanitize_text_field($_POST['payment_choice'] ?? 'pending'),
                'currency'        => 'THB',
                'deposit_amount'  => $deposit ?: null,
                'total_amount'    => $price ?: null,
                'booking_source'  => 'wp-form',
                'message'         => sanitize_textarea_field($_POST['message'] ?? ''),
                'raw_payload'     => wp_json_encode($_POST),
            ),
            array('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%f','%f','%s','%s','%s')
        );

        wp_send_json_success(array(
            'id'      => (int) $wpdb->insert_id,
            'deposit' => $deposit,
            'paypal'  => $deposit ? 'https://paypal.me/prodivingasia/' . $deposit . 'THB' : '',
        ));
    }

    public function render_booking_shortcode() {
        $ajax_url = admin_url('admin-ajax.php');
        $nonce    = wp_create_nonce('ktd_booking_nonce');

        // Enqueue JS via footer to avoid being stripped by page builders
        add_action('wp_footer', function() use ($ajax_url, $nonce) {
            ?>
            <script>
            (function(){
                var form    = document.getElementById('ktd-booking-form');
                if (!form) return;
                var payDiv  = document.getElementById('ktd-pay-options');
                var tyDiv   = document.getElementById('ktd-thank-you');
                var errDiv  = document.getElementById('ktd-error');
                var payNow  = document.getElementById('ktd-pay-now');
                var payLater= document.getElementById('ktd-pay-later');
                var depInfo = document.getElementById('ktd-deposit-info');
                var ajaxUrl = '<?php echo esc_js($ajax_url); ?>';

                form.addEventListener('submit', function(e){
                    e.preventDefault();
                    errDiv.style.display = 'none';
                    var btn = document.getElementById('ktd-submit-btn');
                    btn.disabled = true; btn.textContent = 'Submitting...';

                    var data = new FormData(form);
                    fetch(ajaxUrl, { method:'POST', body: data })
                        .then(function(r){ return r.json(); })
                        .then(function(res){
                            btn.disabled = false; btn.textContent = 'Submit Booking';
                            if (!res.success) {
                                errDiv.textContent = res.data || 'Submission failed.';
                                errDiv.style.display = 'block';
                                errDiv.style.padding = '10px';
                                errDiv.style.background = '#ffe0e0';
                                errDiv.style.borderRadius = '4px';
                                return;
                            }
                            form.style.display = 'none';
                            if (res.data.deposit > 0) {
                                depInfo.textContent = 'Pay a 20% deposit (' + res.data.deposit.toLocaleString() + ' THB) now via PayPal to confirm your spot.';
                                payNow.href = res.data.paypal;
                                payDiv.style.display = 'block';
                            } else {
                                document.getElementById('ktd-ty-msg').textContent = 'Your booking has been received. We will contact you shortly – Team Asia';
                                tyDiv.style.display = 'block';
                            }
                        })
                        .catch(function(){ btn.disabled = false; btn.textContent = 'Submit Booking'; errDiv.textContent = 'Submission failed. Please refresh the page and try again.'; errDiv.style.display='block'; errDiv.style.padding='10px'; errDiv.style.background='#ffe0e0'; errDiv.style.borderRadius='4px'; });
                });

                payLater && payLater.addEventListener('click', function(){
                    payDiv.style.display = 'none';
                    document.getElementById('ktd-ty-msg').textContent = 'No problem – we will contact you to arrange payment. Thank you – Team Asia';
                    tyDiv.style.display = 'block';
                });
            })();
            </script>
            <?php
        });

        ob_start();
        ?>
        <div id="ktd-booking-wrap" style="max-width:520px;margin:2rem auto;background:#fff;color:#222;padding:2.5rem;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,.08);">
            <h2 style="text-align:center;margin-bottom:1.5rem;">Booking / Inquiry Form</h2>
            <div id="ktd-thank-you" style="display:none;background:#e6ffe6;border-radius:8px;padding:32px;text-align:center;color:#1a4d1a;">
                <p id="ktd-ty-msg">Thank you – Team Asia</p>
            </div>
            <form id="ktd-booking-form" method="post" style="display:flex;flex-direction:column;gap:1.1rem;">
                <input type="hidden" name="action" value="ktd_submit_booking" />
                <input type="hidden" name="nonce" value="<?php echo esc_attr($nonce); ?>" />

                <div style="display:flex;flex-direction:column;">
                    <label for="ktd_name" style="margin-bottom:4px;font-weight:500;">Name *</label>
                    <input type="text" id="ktd_name" name="name" required style="padding:.5rem;border-radius:4px;border:1px solid #ccc;" />
                </div>
                <div style="display:flex;flex-direction:column;">
                    <label for="ktd_course" style="margin-bottom:4px;font-weight:500;">Course *</label>
                    <select id="ktd_course" name="course_title" required style="padding:.5rem;border-radius:4px;border:1px solid #ccc;">
                        <option value="">Select...</option>
                        <option value="Open Water">Open Water – 12,000 THB</option>
                        <option value="Advanced Open Water">Advanced Open Water – 11,000 THB</option>
                        <option value="Rescue Diver">Rescue Diver – 13,000 THB</option>
                        <option value="Divemaster">Divemaster – 35,000 THB</option>
                        <option value="Fun Dive">Fun Dive – 1,800 THB</option>
                    </select>
                </div>
                <div style="display:flex;flex-direction:column;">
                    <label for="ktd_email" style="margin-bottom:4px;font-weight:500;">Email *</label>
                    <input type="email" id="ktd_email" name="email" required style="padding:.5rem;border-radius:4px;border:1px solid #ccc;" />
                </div>
                <div style="display:flex;flex-direction:column;">
                    <label for="ktd_phone" style="margin-bottom:4px;font-weight:500;">Phone</label>
                    <input type="text" id="ktd_phone" name="phone" style="padding:.5rem;border-radius:4px;border:1px solid #ccc;" />
                </div>
                <div style="display:flex;flex-direction:column;">
                    <label for="ktd_date" style="margin-bottom:4px;font-weight:500;">Arrival Date</label>
                    <input type="date" id="ktd_date" name="arrival_date" style="padding:.5rem;border-radius:4px;border:1px solid #ccc;" />
                </div>
                <div style="display:flex;flex-direction:column;">
                    <label for="ktd_exp" style="margin-bottom:4px;font-weight:500;">Diving Experience</label>
                    <select id="ktd_exp" name="diving_experience" style="padding:.5rem;border-radius:4px;border:1px solid #ccc;">
                        <option value="">Select...</option>
                        <option value="none">No diving experience</option>
                        <option value="beginner">Beginner (1–10 dives)</option>
                        <option value="intermediate">Intermediate (10–50 dives)</option>
                        <option value="advanced">Advanced (50+ dives)</option>
                        <option value="professional">Professional diver</option>
                    </select>
                </div>
                <div style="display:flex;flex-direction:column;">
                    <label for="ktd_msg" style="margin-bottom:4px;font-weight:500;">Comments / Questions</label>
                    <textarea id="ktd_msg" name="message" rows="3" style="padding:.5rem;border-radius:4px;border:1px solid #ccc;"></textarea>
                </div>
                <div id="ktd-error" style="display:none;color:red;"></div>
                <button type="submit" id="ktd-submit-btn" style="margin-top:1.5rem;padding:.75rem 1.5rem;background:#0070ba;color:#fff;border:none;border-radius:4px;font-size:1rem;cursor:pointer;width:100%;">
                    Submit Booking
                </button>
            </form>
            <div id="ktd-pay-options" style="display:none;margin-top:24px;background:#f8f8f8;border-radius:8px;padding:24px;text-align:center;">
                <h3 style="margin-bottom:12px;">Secure Your Spot</h3>
                <p id="ktd-deposit-info" style="margin-bottom:16px;"></p>
                <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
                    <a id="ktd-pay-now" href="#" target="_blank" style="background:#0070ba;color:#fff;border:none;border-radius:4px;padding:.75rem 1.5rem;font-size:1rem;text-decoration:none;">
                        Pay Deposit via PayPal
                    </a>
                    <button id="ktd-pay-later" style="background:#eee;color:#333;border:none;border-radius:4px;padding:.75rem 1.5rem;font-size:1rem;cursor:pointer;">
                        Pay Later
                    </button>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    public function get_page_content( WP_REST_Request $request ) {
        global $wpdb;
        $pc_table = $wpdb->prefix . 'ktd_page_content';
        $slug     = sanitize_text_field( $request->get_param('slug') ?? '' );
        $locale   = sanitize_text_field( $request->get_param('locale') ?? 'en' );

        if ( empty( $slug ) ) {
            return new WP_Error('missing_slug', 'slug parameter required', array('status' => 400));
        }

        $rows = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT section_key, content_value, content_type, updated_at FROM {$pc_table} WHERE page_slug = %s AND locale = %s",
                $slug, $locale
            ),
            ARRAY_A
        );

        nocache_headers();

        $response = rest_ensure_response( $rows ?: [] );
        $response->header( 'Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0' );
        $response->header( 'Pragma', 'no-cache' );
        $response->header( 'Expires', 'Wed, 11 Jan 1984 05:00:00 GMT' );
        $response->header( 'Surrogate-Control', 'no-store' );
        $response->header( 'X-LiteSpeed-Cache-Control', 'no-cache' );

        return $response;
    }

    public function import_page_content( WP_REST_Request $request ) {
        global $wpdb;
        $pc_table = $wpdb->prefix . 'ktd_page_content';
        $rows     = $request->get_json_params();

        if ( ! is_array( $rows ) || empty( $rows ) ) {
            return new WP_Error('invalid_data', 'Expected JSON array of rows', array('status' => 400));
        }

        $inserted = 0;
        $skipped  = 0;

        foreach ( $rows as $row ) {
            $id      = sanitize_text_field( $row['id'] ?? '' );
            $slug    = sanitize_text_field( $row['page_slug'] ?? '' );
            $locale  = sanitize_text_field( $row['locale'] ?? 'en' );
            $key     = sanitize_text_field( $row['section_key'] ?? '' );
            $type    = sanitize_text_field( $row['content_type'] ?? 'text' );
            $value   = $row['content_value'] ?? '';
            $by      = sanitize_text_field( $row['updated_by'] ?? '' );
            $created = $row['created_at'] ?? current_time('mysql');
            $updated = $row['updated_at'] ?? current_time('mysql');

            if ( empty( $id ) || empty( $slug ) || empty( $key ) ) { $skipped++; continue; }

            $result = $wpdb->replace(
                $pc_table,
                [
                    'id'           => $id,
                    'page_slug'    => $slug,
                    'locale'       => $locale,
                    'section_key'  => $key,
                    'content_type' => $type,
                    'content_value'=> $value,
                    'updated_by'   => $by,
                    'created_at'   => date('Y-m-d H:i:s', strtotime($created)),
                    'updated_at'   => date('Y-m-d H:i:s', strtotime($updated)),
                ],
                [ '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' ]
            );

            if ( $result !== false ) $inserted++; else $skipped++;
        }

        if ( $inserted > 0 ) {
            $this->purge_content_cache();
        }

        return rest_ensure_response( [ 'inserted' => $inserted, 'skipped' => $skipped ] );
    }

    private function purge_content_cache() {
        do_action( 'litespeed_purge_all' );
    }

    public function handle_cf7_submission( $contact_form ) {
        $submission = WPCF7_Submission::get_instance();
        if ( ! $submission ) return;

        $data = $submission->get_posted_data();

        $name           = sanitize_text_field( $data['your-name'] ?? $data['name'] ?? '' );
        $email          = sanitize_email( $data['your-email'] ?? $data['email'] ?? '' );
        $phone          = sanitize_text_field( $data['your-phone'] ?? $data['phone'] ?? '' );
        $preferred_date = sanitize_text_field( $data['your-date'] ?? $data['preferred_date'] ?? $data['date'] ?? '' );
        $message        = sanitize_textarea_field( $data['your-message'] ?? $data['message'] ?? '' );
        $course         = sanitize_text_field( $data['your-course'] ?? $data['course'] ?? $data['activity'] ?? 'Enquiry via CF7' );
        $accommodation  = sanitize_text_field( $data['your-accommodation'] ?? $data['accommodation'] ?? '' );
        $experience     = sanitize_text_field( $data['your-experience'] ?? $data['experience_level'] ?? '' );

        if ( empty( $email ) && empty( $name ) ) return;

        // Save to wp_ktd_bookings MySQL table
        global $wpdb;
        $now = current_time( 'mysql' );
        $wpdb->insert(
            $this->table_name,
            [
                'created_at'       => $now,
                'updated_at'       => $now,
                'status'           => 'new',
                'booking_type'     => 'course',
                'item_title'       => $course,
                'name'             => $name,
                'email'            => $email,
                'phone'            => $phone,
                'accommodation'    => $accommodation,
                'preferred_date'   => $preferred_date,
                'experience_level' => $experience,
                'payment_choice'   => 'inquire',
                'booking_source'   => 'cf7',
                'message'          => $message,
            ],
            [ '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' ]
        );

        // Forward to Vercel notification API (sends admin + customer emails)
        wp_remote_post( 'https://www.divinginasia.com/api/send-booking-notification', [
            'headers' => [ 'Content-Type' => 'application/json' ],
            'body'    => wp_json_encode([
                'name'             => $name,
                'email'            => $email,
                'phone'            => $phone,
                'accommodation'    => $accommodation,
                'preferred_date'   => $preferred_date,
                'experience_level' => $experience,
                'item_title'       => $course,
                'message'          => $message,
                'payment_choice'   => 'inquire',
                'booking_source'   => 'cf7',
            ]),
            'timeout' => 15,
        ] );
    }

    public function render_page_content_admin() {
        if (!current_user_can('manage_options')) return;
        global $wpdb;
        $pc_table   = $wpdb->prefix . 'ktd_page_content';
        $nonce      = wp_create_nonce('ktd_admin_nonce');
        $ajax_url   = admin_url('admin-ajax.php');
        $all_slugs  = $wpdb->get_col("SELECT DISTINCT page_slug FROM {$pc_table} ORDER BY page_slug ASC");
        $cur_slug   = sanitize_text_field($_GET['page_slug'] ?? ($all_slugs[0] ?? ''));
        $cur_locale = sanitize_text_field($_GET['locale'] ?? 'en');
        $rows       = [];
        if ($cur_slug) {
            $rows = $wpdb->get_results(
                $wpdb->prepare("SELECT * FROM {$pc_table} WHERE page_slug = %s AND locale = %s ORDER BY section_key ASC", $cur_slug, $cur_locale),
                ARRAY_A
            );
        }
        $locales = $wpdb->get_col("SELECT DISTINCT locale FROM {$pc_table} ORDER BY locale ASC");
        ?>
        <div class="wrap" style="max-width:1200px;">
            <h1>Page Content Editor</h1>
            <style>
                .ktdpc-bar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:16px;padding:12px;background:#fff;border:1px solid #d6def5;border-radius:10px;}
                .ktdpc-bar select,.ktdpc-bar input{min-height:34px;border:1px solid #c9d3f2;border-radius:7px;padding:0 10px;}
                .ktdpc-btn{border:1px solid #c9d3f2;border-radius:7px;background:#fff;min-height:34px;padding:0 14px;cursor:pointer;font-size:13px;}
                .ktdpc-btn-primary{background:#0b5fff;color:#fff;border-color:#0b5fff;}
                .ktdpc-btn-danger{color:#b3261e;border-color:#f3c7c2;}
                .ktdpc-table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #d6def5;border-radius:10px;overflow:hidden;}
                .ktdpc-table th{background:#f5f8ff;border-bottom:1px solid #d6def5;padding:9px 10px;text-align:left;font-size:12px;text-transform:uppercase;color:#5b6480;}
                .ktdpc-table td{border-bottom:1px solid #eef2ff;padding:8px 10px;vertical-align:middle;}
                .ktdpc-table textarea{width:100%;border:1px solid #d5dcf5;border-radius:6px;padding:6px 8px;font-size:13px;font-family:inherit;min-height:52px;resize:vertical;}
                .ktdpc-table input[type=text]{width:100%;border:1px solid #d5dcf5;border-radius:6px;padding:6px 8px;font-size:13px;}
                #ktdpc-msg{display:none;padding:9px 14px;border-radius:8px;margin-bottom:12px;font-weight:600;}
                .ktdpc-add-form{background:#fff;border:1px solid #d6def5;border-radius:10px;padding:16px;margin-top:20px;}
                .ktdpc-add-form h3{margin:0 0 12px;}
                .ktdpc-add-grid{display:grid;grid-template-columns:1fr 1fr 1fr 2fr 1fr;gap:10px;align-items:end;}
                .ktdpc-add-grid label{font-size:12px;font-weight:600;color:#5b6480;display:block;margin-bottom:4px;}
                .ktdpc-add-grid input,.ktdpc-add-grid select,.ktdpc-add-grid textarea{width:100%;border:1px solid #d5dcf5;border-radius:6px;padding:6px 8px;font-size:13px;}
            </style>
            <p id="ktdpc-msg"></p>
            <form method="get" class="ktdpc-bar">
                <input type="hidden" name="page" value="ktd-page-content" />
                <label style="font-weight:600;margin:0;">Page:</label>
                <select name="page_slug" onchange="this.form.submit()">
                    <?php foreach ($all_slugs as $s) : ?>
                        <option value="<?php echo esc_attr($s); ?>" <?php selected($cur_slug, $s); ?>><?php echo esc_html($s); ?></option>
                    <?php endforeach; ?>
                </select>
                <label style="font-weight:600;margin:0;">Locale:</label>
                <select name="locale" onchange="this.form.submit()">
                    <?php foreach ($locales as $l) : ?>
                        <option value="<?php echo esc_attr($l); ?>" <?php selected($cur_locale, $l); ?>><?php echo esc_html($l); ?></option>
                    <?php endforeach; ?>
                </select>
                <span style="color:#888;font-size:13px;"><?php echo count($rows); ?> rows</span>
            </form>

            <table class="ktdpc-table">
                <thead><tr>
                    <th style="width:220px;">Section Key</th>
                    <th style="width:80px;">Type</th>
                    <th>Content Value</th>
                    <th style="width:120px;">Updated</th>
                    <th style="width:90px;">Actions</th>
                </tr></thead>
                <tbody id="ktdpc-tbody">
                <?php if (empty($rows)) : ?>
                    <tr><td colspan="5" style="padding:16px;color:#888;">No content rows for this page/locale.</td></tr>
                <?php else : foreach ($rows as $r) : ?>
                    <tr id="ktdpc-row-<?php echo esc_attr($r['id']); ?>" data-id="<?php echo esc_attr($r['id']); ?>">
                        <td><code style="font-size:12px;word-break:break-all;"><?php echo esc_html($r['section_key']); ?></code></td>
                        <td><span style="font-size:12px;color:#888;"><?php echo esc_html($r['content_type']); ?></span></td>
                        <td><textarea class="ktdpc-value" rows="2"><?php echo esc_textarea($r['content_value'] ?? ''); ?></textarea></td>
                        <td style="font-size:11px;color:#888;white-space:nowrap;"><?php echo esc_html(substr($r['updated_at'] ?? '', 0, 16)); ?></td>
                        <td>
                            <div style="display:flex;gap:6px;">
                                <button type="button" class="ktdpc-btn ktdpc-btn-primary ktdpc-save" data-id="<?php echo esc_attr($r['id']); ?>">Save</button>
                                <button type="button" class="ktdpc-btn ktdpc-btn-danger ktdpc-delete" data-id="<?php echo esc_attr($r['id']); ?>">Del</button>
                            </div>
                        </td>
                    </tr>
                <?php endforeach; endif; ?>
                </tbody>
            </table>

            <div class="ktdpc-add-form">
                <h3>Add New Row</h3>
                <div class="ktdpc-add-grid">
                    <div>
                        <label>Section Key *</label>
                        <input type="text" id="ktdpc-new-key" placeholder="hero_title" />
                    </div>
                    <div>
                        <label>Page Slug *</label>
                        <input type="text" id="ktdpc-new-slug" value="<?php echo esc_attr($cur_slug); ?>" />
                    </div>
                    <div>
                        <label>Locale</label>
                        <input type="text" id="ktdpc-new-locale" value="<?php echo esc_attr($cur_locale); ?>" />
                    </div>
                    <div>
                        <label>Content Value</label>
                        <textarea id="ktdpc-new-value" rows="2"></textarea>
                    </div>
                    <div>
                        <button type="button" class="ktdpc-btn ktdpc-btn-primary" id="ktdpc-add-btn" style="width:100%;height:52px;">+ Add Row</button>
                    </div>
                </div>
            </div>
        </div>
        <script>
        (function(){
            var ajaxUrl = '<?php echo esc_js($ajax_url); ?>';
            var nonce   = '<?php echo esc_js($nonce); ?>';
            function showMsg(msg, ok) {
                var el = document.getElementById('ktdpc-msg');
                el.textContent = msg;
                el.style.background = ok ? '#e6ffe6' : '#ffe0e0';
                el.style.color = ok ? '#1a4d1a' : '#7a0000';
                el.style.display = 'block';
                setTimeout(function(){ el.style.display = 'none'; }, 3000);
            }
            function post(action, body, cb) {
                var fd = new FormData();
                fd.append('action', action);
                fd.append('nonce', nonce);
                for (var k in body) fd.append(k, body[k]);
                fetch(ajaxUrl, { method:'POST', body:fd })
                    .then(function(r){ return r.json(); })
                    .then(cb)
                    .catch(function(){ showMsg('Request failed', false); });
            }
            document.querySelectorAll('.ktdpc-save').forEach(function(btn){
                btn.addEventListener('click', function(){
                    var id  = this.dataset.id;
                    var row = document.getElementById('ktdpc-row-' + id);
                    var val = row.querySelector('.ktdpc-value').value;
                    post('ktd_admin_save_page_content', { id:id, content_value:val }, function(res){
                        if (res.success) showMsg('Saved', true);
                        else showMsg(res.data || 'Failed', false);
                    });
                });
            });
            document.querySelectorAll('.ktdpc-delete').forEach(function(btn){
                btn.addEventListener('click', function(){
                    var id = this.dataset.id;
                    if (!confirm('Delete this row?')) return;
                    post('ktd_admin_delete_page_content', { id:id }, function(res){
                        if (res.success) {
                            var row = document.getElementById('ktdpc-row-' + id);
                            if (row) row.remove();
                            showMsg('Deleted', true);
                        } else showMsg(res.data || 'Failed', false);
                    });
                });
            });
            document.getElementById('ktdpc-add-btn').addEventListener('click', function(){
                var key    = document.getElementById('ktdpc-new-key').value.trim();
                var slug   = document.getElementById('ktdpc-new-slug').value.trim();
                var locale = document.getElementById('ktdpc-new-locale').value.trim();
                var value  = document.getElementById('ktdpc-new-value').value;
                if (!key || !slug) { showMsg('Section key and page slug are required', false); return; }
                post('ktd_admin_add_page_content', { section_key:key, page_slug:slug, locale:locale||'en', content_value:value }, function(res){
                    if (res.success) {
                        showMsg('Row added', true);
                        document.getElementById('ktdpc-new-key').value = '';
                        document.getElementById('ktdpc-new-value').value = '';
                        var tr = document.createElement('tr');
                        tr.id = 'ktdpc-row-' + res.data.id;
                        tr.setAttribute('data-id', res.data.id);
                        tr.innerHTML = '<td><code style="font-size:12px;">' + key + '</code></td><td><span style="font-size:12px;color:#888;">text</span></td><td><textarea class="ktdpc-value" rows="2">' + value.replace(/</g,'&lt;') + '</textarea></td><td style="font-size:11px;color:#888;">just now</td><td><div style="display:flex;gap:6px;"><button type="button" class="ktdpc-btn ktdpc-btn-primary ktdpc-save" data-id="' + res.data.id + '">Save</button><button type="button" class="ktdpc-btn ktdpc-btn-danger ktdpc-delete" data-id="' + res.data.id + '">Del</button></div></td>';
                        var tbody = document.getElementById('ktdpc-tbody');
                        tbody.appendChild(tr);
                        tr.querySelector('.ktdpc-save').addEventListener('click', function(){
                            var val2 = tr.querySelector('.ktdpc-value').value;
                            post('ktd_admin_save_page_content', { id:res.data.id, content_value:val2 }, function(r){ showMsg(r.success?'Saved':'Failed', r.success); });
                        });
                        tr.querySelector('.ktdpc-delete').addEventListener('click', function(){
                            if (!confirm('Delete?')) return;
                            post('ktd_admin_delete_page_content', { id:res.data.id }, function(r){ if(r.success) tr.remove(); });
                        });
                    } else showMsg(res.data || 'Failed', false);
                });
            });
        })();
        </script>
        <?php
    }

    public function ajax_save_page_content() {
        check_ajax_referer('ktd_admin_nonce', 'nonce');
        if (!current_user_can('manage_options')) { wp_send_json_error('Forbidden', 403); }
        global $wpdb;
        $id    = sanitize_text_field($_POST['id'] ?? '');
        $value = wp_unslash($_POST['content_value'] ?? '');
        if (!$id) { wp_send_json_error('Missing ID', 400); }
        $wpdb->update(
            $wpdb->prefix . 'ktd_page_content',
            array('content_value' => $value, 'updated_at' => current_time('mysql')),
            array('id' => $id),
            array('%s', '%s'),
            array('%s')
        );
        if ($wpdb->last_error) { wp_send_json_error('DB error: ' . $wpdb->last_error, 500); }
        $this->purge_content_cache();
        wp_send_json_success(array('id' => $id));
    }

    public function ajax_delete_page_content() {
        check_ajax_referer('ktd_admin_nonce', 'nonce');
        if (!current_user_can('manage_options')) { wp_send_json_error('Forbidden', 403); }
        global $wpdb;
        $id = sanitize_text_field($_POST['id'] ?? '');
        if (!$id) { wp_send_json_error('Missing ID', 400); }
        $deleted = $wpdb->delete($wpdb->prefix . 'ktd_page_content', array('id' => $id), array('%s'));
        if ($deleted === false) { wp_send_json_error('DB error: ' . $wpdb->last_error, 500); }
        $this->purge_content_cache();
        wp_send_json_success(array('id' => $id));
    }

    public function ajax_add_page_content() {
        check_ajax_referer('ktd_admin_nonce', 'nonce');
        if (!current_user_can('manage_options')) { wp_send_json_error('Forbidden', 403); }
        global $wpdb;
        $slug   = sanitize_text_field($_POST['page_slug'] ?? '');
        $locale = sanitize_text_field($_POST['locale'] ?? 'en');
        $key    = sanitize_text_field($_POST['section_key'] ?? '');
        $value  = wp_unslash($_POST['content_value'] ?? '');
        if (!$slug || !$key) { wp_send_json_error('section_key and page_slug required', 400); }
        $id = wp_generate_uuid4();
        $now = current_time('mysql');
        $inserted = $wpdb->insert(
            $wpdb->prefix . 'ktd_page_content',
            array('id' => $id, 'page_slug' => $slug, 'locale' => $locale, 'section_key' => $key, 'content_type' => 'text', 'content_value' => $value, 'updated_by' => wp_get_current_user()->user_login, 'created_at' => $now, 'updated_at' => $now),
            array('%s','%s','%s','%s','%s','%s','%s','%s','%s')
        );
        if ($inserted === false) { wp_send_json_error('DB error: ' . $wpdb->last_error, 500); }
        $this->purge_content_cache();
        wp_send_json_success(array('id' => $id));
    }
}

register_activation_hook(__FILE__, array('KTD_Booking_Manager', 'activate'));
KTD_Booking_Manager::instance();

