<?php
/**
 * Plugin Name: KTD Bookings Manager
* Description: Manage Go. Pro Diving Asia bookings from WordPress admin. Finance, invoices, status updates.
 * Version: 1.0.0
 * Author: One Media Asia
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'KTD_BOOKINGS_VERSION', '1.0.0' );
define( 'KTD_BOOKINGS_DIR', plugin_dir_path( __FILE__ ) );
define( 'KTD_BOOKINGS_URL', plugin_dir_url( __FILE__ ) );

require_once KTD_BOOKINGS_DIR . 'includes/class-api-client.php';
require_once KTD_BOOKINGS_DIR . 'includes/class-booking-status.php';
require_once KTD_BOOKINGS_DIR . 'includes/class-bookings-list.php';
require_once KTD_BOOKINGS_DIR . 'includes/class-booking-detail.php';
require_once KTD_BOOKINGS_DIR . 'includes/class-finance.php';
require_once KTD_BOOKINGS_DIR . 'includes/class-invoice.php';
require_once KTD_BOOKINGS_DIR . 'includes/class-web3forms-client.php';

class KTD_Bookings_Plugin {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'register_menus' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_assets' ] );
        add_action( 'wp_ajax_ktd_update_booking', [ $this, 'ajax_update_booking' ] );
        add_action( 'wp_ajax_ktd_add_comment', [ $this, 'ajax_add_comment' ] );
    }

    public function register_menus() {
        add_menu_page(
            'KTD Bookings',
            'KTD Bookings',
            'manage_options',
            'ktd-bookings',
            [ $this, 'page_bookings' ],
            'dashicons-calendar-alt',
            30
        );
        add_submenu_page( 'ktd-bookings', 'All Bookings', 'All Bookings', 'manage_options', 'ktd-bookings', [ $this, 'page_bookings' ] );
        add_submenu_page( 'ktd-bookings', 'Finance', 'Finance', 'manage_options', 'ktd-finance', [ $this, 'page_finance' ] );
        add_submenu_page( 'ktd-bookings', 'Settings', 'Settings', 'manage_options', 'ktd-settings', [ $this, 'page_settings' ] );
        // Hidden detail page (no menu item)
        add_submenu_page( null, 'Booking Detail', 'Booking Detail', 'manage_options', 'ktd-booking-detail', [ $this, 'page_booking_detail' ] );
        add_submenu_page( null, 'Invoice', 'Invoice', 'manage_options', 'ktd-invoice', [ $this, 'page_invoice' ] );
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
            update_option( 'ktd_web3forms_access_key', sanitize_text_field( $_POST['ktd_web3forms_access_key'] ?? '' ) );
            update_option( 'ktd_web3forms_enabled', isset( $_POST['ktd_web3forms_enabled'] ) ? '1' : '0' );
            echo '<div class="notice notice-success"><p>Settings saved.</p></div>';
        }
        $api_url     = get_option( 'ktd_api_url', 'https://koh-tao-dive-dreams.vercel.app' );
        $admin_token = get_option( 'ktd_admin_token', '' );
        $web3forms_access_key = get_option( 'ktd_web3forms_access_key', 'e4c4edf6-6e35-456a-87da-b32b961b449a' );
        $web3forms_enabled = get_option( 'ktd_web3forms_enabled', '1' );
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
                            <p class="description">e.g. https://api.divinginasia.com</p>
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
                
                <h2>Email Notifications (Web3Forms)</h2>
                <table class="form-table">
                    <tr>
                        <th><label for="ktd_web3forms_enabled">Enable Web3Forms</label></th>
                        <td>
                            <label>
                                <input type="checkbox" id="ktd_web3forms_enabled" name="ktd_web3forms_enabled" value="1" <?php checked( $web3forms_enabled, '1' ); ?> />
                                Send email notifications via Web3Forms when bookings are created
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="ktd_web3forms_access_key">Web3Forms Access Key</label></th>
                        <td>
                            <input type="text" id="ktd_web3forms_access_key" name="ktd_web3forms_access_key" value="<?php echo esc_attr( $web3forms_access_key ); ?>" class="regular-text" />
                            <p class="description">Your Web3Forms access key for email notifications</p>
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
        $allowed = [ 'status', 'payment_status', 'payment_link_url', 'internal_notes',
                     'bank_transfer_details', 'name', 'email', 'phone', 'course_title',
                     'item_title', 'preferred_date', 'total_amount', 'deposit_amount', 'due_amount' ];
        foreach ( $allowed as $field ) {
            if ( isset( $_POST[ $field ] ) ) {
                $updates[ $field ] = sanitize_text_field( $_POST[ $field ] );
            }
        }

        if ( isset( $updates['status'] ) ) {
            if ( ! \KTD_Booking_Status::is_valid( $updates['status'] ) ) {
                wp_send_json_error( 'Invalid status value.' );
            }

            $updates['status'] = \KTD_Booking_Status::normalize( $updates['status'] );

            $api              = new \KTD_API_Client();
            $current_booking  = $api->get_booking( $id );
            if ( is_wp_error( $current_booking ) ) {
                wp_send_json_error( $current_booking->get_error_message() );
            }

            $current_status = \KTD_Booking_Status::normalize( (string) ( $current_booking['status'] ?? 'new' ) );
            if ( ! \KTD_Booking_Status::can_transition( $current_status, $updates['status'] ) ) {
                $allowed_next = \KTD_Booking_Status::allowed_next( $current_status );
                $allowed_text = empty( $allowed_next )
                    ? 'none'
                    : implode( ', ', array_map( [ '\\KTD_Booking_Status', 'label' ], $allowed_next ) );

                wp_send_json_error(
                    sprintf(
                        'Invalid status transition from %s to %s. Allowed next: %s',
                        \KTD_Booking_Status::label( $current_status ),
                        \KTD_Booking_Status::label( $updates['status'] ),
                        $allowed_text
                    )
                );
            }
        }

        $api    = new \KTD_API_Client();
        $result = $api->patch_booking( $id, $updates );
        if ( is_wp_error( $result ) ) {
            wp_send_json_error( $result->get_error_message() );
        }
        wp_send_json_success( $result );
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

        $existing_notes = $booking['internal_notes'] ?? '';
        $new_line       = '[' . gmdate( 'c' ) . '] Admin: ' . $comment;
        $merged_notes   = $existing_notes ? $existing_notes . "\n" . $new_line : $new_line;

        $result = $api->patch_booking( $id, [ 'internal_notes' => $merged_notes ] );
        if ( is_wp_error( $result ) ) wp_send_json_error( $result->get_error_message() );

        wp_send_json_success( [ 'notes' => $merged_notes ] );
    }
}

new KTD_Bookings_Plugin();
