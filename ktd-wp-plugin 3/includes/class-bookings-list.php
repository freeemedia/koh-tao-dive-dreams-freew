<?php
if ( ! defined( 'ABSPATH' ) ) exit;

require_once __DIR__ . '/class-api-client.php';

class KTD_Bookings_List {

    private \KTD_API_Client $api;

    public function __construct() {
        $this->api = new \KTD_API_Client();
    }

    public function render(): void {
        $bookings = $this->api->get_bookings();
        $error    = '';
        if ( is_wp_error( $bookings ) ) {
            $error    = $bookings->get_error_message();
            $bookings = [];
        }

        $filter_status = sanitize_text_field( $_GET['filter_status'] ?? '' );
        $filter_type   = sanitize_text_field( $_GET['filter_type'] ?? '' );
        $search        = sanitize_text_field( $_GET['s'] ?? '' );

        if ( $filter_status ) {
            $bookings = array_filter( $bookings, fn( $b ) => ( $b['status'] ?? '' ) === $filter_status );
        }
        if ( $filter_type ) {
            $bookings = array_filter( $bookings, fn( $b ) => ( $b['booking_type'] ?? '' ) === $filter_type );
        }
        if ( $search ) {
            $s        = strtolower( $search );
            $bookings = array_filter( $bookings, fn( $b ) =>
                str_contains( strtolower( $b['name'] ?? '' ), $s ) ||
                str_contains( strtolower( $b['email'] ?? '' ), $s ) ||
                str_contains( strtolower( $b['course_title'] ?? $b['item_title'] ?? '' ), $s )
            );
        }

        usort( $bookings, fn( $a, $b ) => strcmp( $b['created_at'] ?? '', $a['created_at'] ?? '' ) );

        $statuses = [ '', 'pending', 'confirmed', 'cancelled', 'completed', 'enquiry' ];
        $types    = [ '', 'course', 'accommodation', 'funDive', 'enquiry' ];
        ?>
        <div class="wrap ktd-wrap">
            <h1 class="wp-heading-inline">KTD Bookings</h1>
            <hr class="wp-header-end">

            <?php if ( $error ) : ?>
                <div class="notice notice-error"><p><?php echo esc_html( $error ); ?> — Check Settings → API URL &amp; Token.</p></div>
            <?php endif; ?>

            <form method="get" class="ktd-filters">
                <input type="hidden" name="page" value="ktd-bookings">
                <input type="search" name="s" value="<?php echo esc_attr( $search ); ?>" placeholder="Search name / email / course…" class="regular-text">
                <select name="filter_status">
                    <?php foreach ( $statuses as $s ) : ?>
                        <option value="<?php echo esc_attr( $s ); ?>" <?php selected( $filter_status, $s ); ?>>
                            <?php echo $s ? ucfirst( $s ) : 'All Statuses'; ?>
                        </option>
                    <?php endforeach; ?>
                </select>
                <select name="filter_type">
                    <?php foreach ( $types as $t ) : ?>
                        <option value="<?php echo esc_attr( $t ); ?>" <?php selected( $filter_type, $t ); ?>>
                            <?php echo $t ? ucfirst( $t ) : 'All Types'; ?>
                        </option>
                    <?php endforeach; ?>
                </select>
                <?php submit_button( 'Filter', 'secondary', '', false ); ?>
                <a href="<?php echo esc_url( admin_url( 'admin.php?page=ktd-bookings' ) ); ?>" class="button">Reset</a>
            </form>

            <table class="wp-list-table widefat fixed striped ktd-table">
                <thead>
                    <tr>
                        <th width="40">#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Course / Item</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ( empty( $bookings ) ) : ?>
                        <tr><td colspan="10">No bookings found.</td></tr>
                    <?php else : ?>
                        <?php foreach ( $bookings as $b ) :
                            $id      = $b['id'] ?? '';
                            $title   = $b['course_title'] ?? $b['item_title'] ?? '—';
                            $status  = $b['status'] ?? 'pending';
                            $payment = $b['payment_status'] ?? '—';
                            $total   = isset( $b['total_amount'] ) ? number_format( (float) $b['total_amount'], 0 ) . ' THB' : '—';
                            $date    = $b['preferred_date'] ?? substr( $b['created_at'] ?? '', 0, 10 );
                            $detail_url  = admin_url( 'admin.php?page=ktd-booking-detail&id=' . urlencode( $id ) );
                            $invoice_url = admin_url( 'admin.php?page=ktd-invoice&id=' . urlencode( $id ) );
                        ?>
                        <tr>
                            <td><?php echo esc_html( $id ); ?></td>
                            <td><?php echo esc_html( $b['name'] ?? '—' ); ?></td>
                            <td><?php echo esc_html( $b['email'] ?? '—' ); ?></td>
                            <td><?php echo esc_html( $title ); ?></td>
                            <td><?php echo esc_html( $b['booking_type'] ?? '—' ); ?></td>
                            <td><?php echo esc_html( $date ); ?></td>
                            <td><span class="ktd-badge ktd-status-<?php echo esc_attr( $status ); ?>"><?php echo esc_html( $status ); ?></span></td>
                            <td><span class="ktd-badge ktd-pay-<?php echo esc_attr( $payment ); ?>"><?php echo esc_html( $payment ); ?></span></td>
                            <td><?php echo esc_html( $total ); ?></td>
                            <td class="ktd-actions">
                                <a href="<?php echo esc_url( $detail_url ); ?>" class="button button-small">Edit</a>
                                <a href="<?php echo esc_url( $invoice_url ); ?>" class="button button-small" target="_blank">Invoice</a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
            <p class="ktd-count"><?php echo count( $bookings ); ?> booking(s) shown.</p>
        </div>
        <?php
    }
}
