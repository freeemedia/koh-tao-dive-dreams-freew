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
        add_action('wp_ajax_ktd_admin_save_note', array($this, 'ajax_admin_save_note'));
        add_action('wp_ajax_ktd_admin_save_booking', array($this, 'ajax_admin_save_booking'));
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
    }

    public function register_settings() {
        register_setting('ktd_booking_settings', $this->option_key);
    }

    public function ajax_admin_update_status() {
        check_ajax_referer('ktd_admin_nonce', 'nonce');
        if (!current_user_can('manage_options')) { wp_send_json_error('Forbidden', 403); }
        $id     = absint($_POST['id'] ?? 0);
        $status = sanitize_text_field($_POST['status'] ?? '');
        $allowed = array('new','pending','confirmed','completed','cancelled');
        if (!$id || !in_array($status, $allowed, true)) { wp_send_json_error('Invalid input', 400); }
        global $wpdb;
        $updated = $wpdb->update($this->table_name, array('status' => $status, 'updated_at' => current_time('mysql')), array('id' => $id), array('%s','%s'), array('%d'));
        if ($updated === false) { wp_send_json_error('DB error: ' . $wpdb->last_error, 500); }
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

        $status = sanitize_text_field($_POST['status'] ?? 'new');
        $allowed_status = array('new', 'pending', 'confirmed', 'completed', 'cancelled');
        if (!in_array($status, $allowed_status, true)) {
            $status = 'new';
        }

        $payload = array(
            'name' => sanitize_text_field($_POST['name'] ?? ''),
            'email' => sanitize_email($_POST['email'] ?? ''),
            'phone' => sanitize_text_field($_POST['phone'] ?? ''),
            'item_title' => sanitize_text_field($_POST['item_title'] ?? ''),
            'preferred_date' => sanitize_text_field($_POST['preferred_date'] ?? ''),
            'payment_choice' => sanitize_text_field($_POST['payment_choice'] ?? ''),
            'status' => $status,
            'internal_notes' => sanitize_textarea_field($_POST['internal_notes'] ?? ''),
            'updated_at' => current_time('mysql'),
        );

        global $wpdb;
        $updated = $wpdb->update(
            $this->table_name,
            $payload,
            array('id' => $id),
            array('%s','%s','%s','%s','%s','%s','%s','%s','%s'),
            array('%d')
        );

        if ($updated === false) {
            wp_send_json_error('DB error: ' . $wpdb->last_error, 500);
        }

        wp_send_json_success(array('id' => $id));
    }

    public function register_rest_routes() {
        register_rest_route('ktd/v1', '/bookings', array(
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
    }

    private function normalize_number($value) {
        if ($value === null || $value === '') {
            return null;
        }
        return is_numeric($value) ? (float) $value : null;
    }

    private function validate_api_key($request) {
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
            </div>

            <p id="ktd-admin-msg"></p>

            <div class="ktd-table-wrap">
                <table class="widefat striped ktd-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Course</th>
                            <th>Preferred Date</th>
                            <th>Payment</th>
                            <th>Deposit / Total</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="ktd-bookings-tbody">
                    <?php if (empty($rows)) : ?>
                        <tr><td colspan="12">No bookings found.</td></tr>
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
                                <td style="white-space:nowrap;"><?php echo esc_html($row_date); ?></td>
                                <td>
                                    <span class="ktd-pill <?php echo esc_attr($row['status'] ?? 'new'); ?>"><?php echo esc_html(ucfirst($row['status'] ?? 'new')); ?></span>
                                    <select class="ktd-field" data-field="status" style="margin-top:6px;">
                                        <?php foreach ($status_opts as $s) : ?>
                                            <option value="<?php echo esc_attr($s); ?>" <?php selected($row['status'], $s); ?>><?php echo esc_html(ucfirst($s)); ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </td>
                                <td><input class="ktd-field" data-field="name" value="<?php echo esc_attr($row['name'] ?? ''); ?>" /></td>
                                <td><input class="ktd-field" data-field="email" value="<?php echo esc_attr($row['email'] ?? ''); ?>" /></td>
                                <td><input class="ktd-field" data-field="phone" value="<?php echo esc_attr($row['phone'] ?? ''); ?>" /></td>
                                <td><input class="ktd-field" data-field="item_title" value="<?php echo esc_attr($row['item_title'] ?? ''); ?>" /></td>
                                <td><input class="ktd-field" data-field="preferred_date" value="<?php echo esc_attr($row['preferred_date'] ?? ''); ?>" /></td>
                                <td><input class="ktd-field" data-field="payment_choice" value="<?php echo esc_attr($row['payment_choice'] ?? ''); ?>" /></td>
                                <td style="white-space:nowrap;font-size:12px;">
                                    Dep: <?php echo !empty($row['deposit_amount']) ? esc_html(number_format((float)$row['deposit_amount'], 0)) : '-'; ?><br>
                                    Tot: <?php echo !empty($row['total_amount']) ? esc_html(number_format((float)$row['total_amount'], 0)) : '-'; ?>
                                </td>
                                <td>
                                    <textarea class="ktd-field" data-field="internal_notes" rows="2"><?php echo esc_textarea($row['internal_notes'] ?? ''); ?></textarea>
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
                var lines = ['id,date,status,name,email,phone,course,preferred_date,payment_choice,deposit,total,notes'];
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
                        get('[data-field="item_title"]'),
                        get('[data-field="preferred_date"]'),
                        get('[data-field="payment_choice"]'),
                        row.cells[9] ? row.cells[9].innerText.replace(/\n/g, ' ').trim() : '',
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
                        payload[field.getAttribute('data-field')] = field.value || '';
                    });

                    post('ktd_admin_save_booking', payload, function(res){
                        if (res.success) {
                            row.setAttribute('data-status', payload.status || 'new');
                            row.setAttribute('data-search', ((payload.name || '') + ' ' + (payload.email || '') + ' ' + (payload.phone || '') + ' ' + (payload.item_title || '')).toLowerCase().trim());
                            var pill = row.querySelector('.ktd-pill');
                            if (pill) {
                                pill.className = 'ktd-pill ' + (payload.status || 'new');
                                pill.textContent = (payload.status || 'new').charAt(0).toUpperCase() + (payload.status || 'new').slice(1);
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
}

register_activation_hook(__FILE__, array('KTD_Booking_Manager', 'activate'));
KTD_Booking_Manager::instance();
