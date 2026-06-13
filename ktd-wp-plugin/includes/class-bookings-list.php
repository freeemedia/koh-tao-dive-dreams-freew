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
        $search        = sanitize_text_field( $_GET['s'] ?? '' );

        if ( $filter_status ) {
            $bookings = array_filter( $bookings, fn( $b ) => \KTD_Booking_Status::normalize( (string) ( $b['status'] ?? 'new' ) ) === $filter_status );
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

        $statuses = [ '' ];
        foreach ( $bookings as $b ) {
            $normalized = \KTD_Booking_Status::normalize( (string) ( $b['status'] ?? '' ) );
            if ( $normalized !== '' ) {
                $statuses[] = $normalized;
            }
        }
        $statuses = array_values( array_unique( array_merge( $statuses, \KTD_Booking_Status::all() ) ) );
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
                            <?php echo $s ? esc_html( \KTD_Booking_Status::label( $s ) ) : 'All Statuses'; ?>
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
                        <th>Date</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ( empty( $bookings ) ) : ?>
                        <tr><td colspan="9">No bookings found.</td></tr>
                    <?php else : ?>
                        <?php foreach ( $bookings as $b ) :
                            $id      = $b['id'] ?? '';
                            $title   = $b['course_title'] ?? $b['item_title'] ?? '—';
                            $status  = \KTD_Booking_Status::normalize( (string) ( $b['status'] ?? 'new' ) );
                            $quick_statuses = array_values( array_unique( array_merge(
                                [ $status ],
                                array_values( array_filter( $statuses, fn( $s ) => $s !== '' ) )
                            ) ) );
                            $payment = (string) ( $b['payment_status'] ?? 'unpaid' );
                            if ( $payment === '' ) {
                                $payment = 'unpaid';
                            }
                            $quick_payments = array_values( array_unique( array_merge(
                                [ $payment ],
                                [ 'unpaid', 'deposit_paid', 'paid', 'refunded' ]
                            ) ) );
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
                            <td><?php echo esc_html( $date ); ?></td>
                            <td>
                                <span class="ktd-badge ktd-status-<?php echo esc_attr( $status ); ?>"><?php echo esc_html( \KTD_Booking_Status::label( $status ) ); ?></span>
                                <div style="margin-top:6px;">
                                    <select class="ktd-quick-status" data-id="<?php echo esc_attr( $id ); ?>" data-current="<?php echo esc_attr( $status ); ?>">
                                        <?php foreach ( $quick_statuses as $quick_status ) : ?>
                                            <option value="<?php echo esc_attr( $quick_status ); ?>" <?php selected( $status, $quick_status ); ?>>
                                                <?php echo esc_html( \KTD_Booking_Status::label( $quick_status ) ); ?>
                                            </option>
                                        <?php endforeach; ?>
                                    </select>
                                    <span class="ktd-inline-status-message" aria-live="polite"></span>
                                </div>
                            </td>
                            <td>
                                <span class="ktd-badge ktd-pay-<?php echo esc_attr( $payment ); ?>"><?php echo esc_html( ucwords( str_replace( '_', ' ', $payment ) ) ); ?></span>
                                <div style="margin-top:6px;">
                                    <select class="ktd-quick-payment" data-id="<?php echo esc_attr( $id ); ?>" data-current="<?php echo esc_attr( $payment ); ?>">
                                        <?php foreach ( $quick_payments as $quick_payment ) : ?>
                                            <option value="<?php echo esc_attr( $quick_payment ); ?>" <?php selected( $payment, $quick_payment ); ?>>
                                                <?php echo esc_html( ucwords( str_replace( '_', ' ', $quick_payment ) ) ); ?>
                                            </option>
                                        <?php endforeach; ?>
                                    </select>
                                    <span class="ktd-inline-payment-message" aria-live="polite"></span>
                                </div>
                            </td>
                            <td><?php echo esc_html( $total ); ?></td>
                            <td class="ktd-actions">
                                <a href="<?php echo esc_url( $detail_url ); ?>" class="button button-small">Edit</a>
                                <a href="<?php echo esc_url( $invoice_url ); ?>" class="button button-small" target="_blank" rel="noopener noreferrer">Invoice</a>
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
