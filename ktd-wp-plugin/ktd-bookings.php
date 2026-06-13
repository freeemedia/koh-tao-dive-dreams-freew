<?php
/**
 * Plugin Name: KTD Bookings Manager
 * Description: Manage Pro Diving Asia bookings from WordPress admin. Finance, invoices, status updates.
 * Version: 1.0.18
 * Author: One Media Asia
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'KTD_BOOKINGS_VERSION', '1.0.18' );
define( 'KTD_BOOKINGS_DIR', plugin_dir_path( __FILE__ ) );
define( 'KTD_BOOKINGS_URL', plugin_dir_url( __FILE__ ) );

require_once KTD_BOOKINGS_DIR . 'includes/class-api-client.php';
require_once KTD_BOOKINGS_DIR . 'includes/class-booking-status.php';
require_once KTD_BOOKINGS_DIR . 'includes/class-dashboard.php';
require_once KTD_BOOKINGS_DIR . 'includes/class-bookings-list.php';
require_once KTD_BOOKINGS_DIR . 'includes/class-booking-detail.php';
require_once KTD_BOOKINGS_DIR . 'includes/class-finance.php';
require_once KTD_BOOKINGS_DIR . 'includes/class-invoice.php';

class KTD_Bookings_Plugin {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'register_menus' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_assets' ] );
        add_action( 'wp_ajax_ktd_update_booking', [ $this, 'ajax_update_booking' ] );
        add_action( 'wp_ajax_ktd_add_comment', [ $this, 'ajax_add_comment' ] );
    }

    public function register_menus() {
        add_menu_page(
            'KTD Dashboard',
            'KTD Dashboard',
            'manage_options',
            'ktd-dashboard',
            [ $this, 'page_dashboard' ],
            'dashicons-calendar-alt',
            30
        );
        add_submenu_page( 'ktd-dashboard', 'Dashboard', 'Dashboard', 'manage_options', 'ktd-dashboard', [ $this, 'page_dashboard' ] );
        add_submenu_page( 'ktd-dashboard', 'All Bookings', 'All Bookings', 'manage_options', 'ktd-bookings', [ $this, 'page_bookings' ] );
        add_submenu_page( 'ktd-dashboard', 'Finance', 'Finance', 'manage_options', 'ktd-finance', [ $this, 'page_finance' ] );
        add_submenu_page( 'ktd-dashboard', 'Settings', 'Settings', 'manage_options', 'ktd-settings', [ $this, 'page_settings' ] );
        // Hidden detail page (no menu item)
        add_submenu_page( null, 'Booking Detail', 'Booking Detail', 'manage_options', 'ktd-booking-detail', [ $this, 'page_booking_detail' ] );
        // Hidden invoice page, opened from booking actions.
        add_submenu_page( null, 'Booking Invoice', 'Booking Invoice', 'manage_options', 'ktd-invoice', [ $this, 'page_invoice' ] );
    }

    public function enqueue_assets( $hook ) {
        if ( strpos( $hook, 'ktd' ) === false ) return;
        wp_enqueue_style( 'ktd-admin', KTD_BOOKINGS_URL . 'assets/admin.css', [], KTD_BOOKINGS_VERSION );
        wp_enqueue_script( 'ktd-admin', KTD_BOOKINGS_URL . 'assets/admin.js', [ 'jquery' ], KTD_BOOKINGS_VERSION, true );
        wp_localize_script( 'ktd-admin', 'ktdAjax', [
            'url'   => admin_url( 'admin-ajax.php' ),
            'nonce' => wp_create_nonce( 'ktd_nonce' ),
        ] );
    }

    public function page_bookings() {
        $list = new \KTD_Bookings_List();
        $list->render();
    }

    public function page_dashboard() {
        $dashboard = new \KTD_Dashboard();
        $dashboard->render();
    }

    public function page_finance() {
        $finance = new \KTD_Finance();
        $finance->render();
    }

    public function page_booking_detail() {
        $detail = new \KTD_Booking_Detail();
        $detail->render();
    }

    public function page_invoice() {
        $invoice = new \KTD_Invoice();
        $invoice->render();
    }

    public function page_settings() {
        if ( isset( $_POST['ktd_save_settings'] ) && check_admin_referer( 'ktd_settings' ) ) {
            update_option( 'ktd_api_url', sanitize_url( $_POST['ktd_api_url'] ?? '' ) );
            update_option( 'ktd_admin_token', sanitize_text_field( $_POST['ktd_admin_token'] ?? '' ) );
            echo '<div class="notice notice-success"><p>Settings saved.</p></div>';
        }
        $api_url_default = class_exists( 'KTD_Booking_Manager' )
            ? home_url( '/wp-json/ktd/v1' )
            : 'https://api.divinginasia.com';
        $api_url     = get_option( 'ktd_api_url', $api_url_default );
        $admin_token = get_option( 'ktd_admin_token', '' );
        ?>
        <div class="wrap">
            <h1>KTD Bookings – Settings</h1>
            <form method="post">
                <?php wp_nonce_field( 'ktd_settings' ); ?>
                <table class="form-table">
                    <tr>
                        <th><label for="ktd_api_url">API Base URL</label></th>
                        <td>
                            <input type="url" id="ktd_api_url" name="ktd_api_url" value="<?php echo esc_attr( $api_url ); ?>" class="regular-text" />
                            <p class="description">Use local sync: <?php echo esc_html( home_url( '/wp-json/ktd/v1' ) ); ?>. Remote option: https://api.divinginasia.com</p>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="ktd_admin_token">Admin Token</label></th>
                        <td>
                            <input type="password" id="ktd_admin_token" name="ktd_admin_token" value="<?php echo esc_attr( $admin_token ); ?>" class="regular-text" />
                            <p class="description">Your ADMIN_LOGIN_TOKEN from Vercel env vars.</p>
                        </td>
                    </tr>
                </table>
                <?php submit_button( 'Save Settings', 'primary', 'ktd_save_settings' ); ?>
            </form>
        </div>
        <?php
    }

    public function ajax_update_booking() {
        check_ajax_referer( 'ktd_nonce', 'nonce' );
        if ( ! current_user_can( 'manage_options' ) ) wp_send_json_error( 'Unauthorized', 403 );

        $id      = sanitize_text_field( $_POST['id'] ?? '' );
        $updates = [];
        $allowed = [ 'status', 'payment_status', 'payment_link_url', 'internal_notes', 'comments',
                     'bank_transfer_details', 'name', 'email', 'phone', 'course_title',
                     'item_title', 'preferred_date', 'total_amount', 'deposit_amount', 'due_amount' ];
        foreach ( $allowed as $field ) {
            if ( isset( $_POST[ $field ] ) ) {
                if ( in_array( $field, [ 'internal_notes', 'comments' ], true ) ) {
                    $updates[ $field ] = sanitize_textarea_field( wp_unslash( $_POST[ $field ] ) );
                } else {
                    $updates[ $field ] = sanitize_text_field( $_POST[ $field ] );
                }
            }
        }

        if ( ! isset( $updates['internal_notes'] ) && isset( $updates['comments'] ) ) {
            $updates['internal_notes'] = $updates['comments'];
        }
        unset( $updates['comments'] );

        if ( isset( $updates['status'] ) ) {
            if ( ! \KTD_Booking_Status::is_valid( $updates['status'] ) ) {
                wp_send_json_error( 'Invalid status value.' );
            }

            $updates['status'] = \KTD_Booking_Status::normalize( $updates['status'] );
            if ( $updates['status'] === 'pending' ) {
                $updates['status'] = 'new';
            }
        }

        if ( isset( $updates['internal_notes'] ) ) {
            $normalized_note = strtolower( preg_replace( '/[^a-z]/', '', trim( (string) $updates['internal_notes'] ) ) ?? '' );
            if ( $normalized_note === 'wordpress' || $normalized_note === 'wordrpress' || str_starts_with( $normalized_note, 'wordpress' ) ) {
                $updates['internal_notes'] = '';
            }
        }

        // Prefer local booking manager updates when available to avoid token/header mismatch issues.
        $result = $this->update_booking_local_first( $id, $updates );
        if ( is_wp_error( $result ) ) {
            wp_send_json_error( $result->get_error_message() );
        }

        wp_send_json_success( $result );
    }

    private function update_booking_local_first( string $id, array $updates ) {
        if ( class_exists( 'KTD_Booking_Manager' ) ) {
            $request = new \WP_REST_Request( 'PATCH', '/ktd/v1/bookings/' . rawurlencode( $id ) );
            $request->set_url_params( [ 'id' => (int) $id ] );
            foreach ( $updates as $key => $value ) {
                $request->set_param( $key, $value );
            }

            $local_result = \KTD_Booking_Manager::update_booking( $request );
            if ( $local_result instanceof \WP_REST_Response ) {
                $data = $local_result->get_data();
                if ( is_array( $data ) && ! empty( $data['success'] ) ) {
                    if ( isset( $data['booking'] ) && is_array( $data['booking'] ) ) {
                        return $data['booking'];
                    }
                    return $data;
                }
            }
        }

        $api    = new \KTD_API_Client();
        return $api->patch_booking( $id, $updates );
    }

    public function ajax_add_comment() {
        check_ajax_referer( 'ktd_nonce', 'nonce' );
        if ( ! current_user_can( 'manage_options' ) ) wp_send_json_error( 'Unauthorized', 403 );

        $id      = sanitize_text_field( $_POST['id'] ?? '' );
        $comment = sanitize_text_field( $_POST['comment'] ?? '' );
        if ( ! $id || ! $comment ) wp_send_json_error( 'Missing id or comment' );

        $api     = new \KTD_API_Client();
        $booking = $api->get_booking( $id );
        if ( is_wp_error( $booking ) ) wp_send_json_error( $booking->get_error_message() );

        $existing_notes = trim( (string) ( $booking['internal_notes'] ?? '' ) );
        $existing_notes_key = strtolower( preg_replace( '/[^a-z]/', '', $existing_notes ) ?? '' );
        if ( $existing_notes_key === 'wordpress' || $existing_notes_key === 'wordrpress' || str_starts_with( $existing_notes_key, 'wordpress' ) ) {
            $existing_notes = '';
        }
        $new_line       = '[' . gmdate( 'c' ) . '] Admin: ' . $comment;
        $merged_notes   = $existing_notes ? $existing_notes . "\n" . $new_line : $new_line;

        $result = $this->update_booking_local_first( $id, [ 'internal_notes' => $merged_notes ] );
        if ( is_wp_error( $result ) ) wp_send_json_error( $result->get_error_message() );

        wp_send_json_success( [ 'notes' => $merged_notes ] );
    }
}

new KTD_Bookings_Plugin();
