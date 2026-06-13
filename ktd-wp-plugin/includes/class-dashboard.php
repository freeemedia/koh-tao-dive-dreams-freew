<?php
if ( ! defined( 'ABSPATH' ) ) exit;

require_once __DIR__ . '/class-api-client.php';

class KTD_Dashboard {

    private \KTD_API_Client $api;

    public function __construct() {
        $this->api = new \KTD_API_Client();
    }

    public function render(): void {
        $bookings = $this->api->get_bookings();
        if ( is_wp_error( $bookings ) ) {
            echo '<div class="wrap"><div class="notice notice-error"><p>' . esc_html( $bookings->get_error_message() ) . '</p></div></div>';
            return;
        }

        $stats = [
            'total'        => 0,
            'new'          => 0,
            'confirmed'    => 0,
            'deposit_paid' => 0,
            'completed'    => 0,
            'cancelled'    => 0,
            'revenue'      => 0,
            'deposits'     => 0,
        ];

        foreach ( $bookings as $booking ) {
            $status = \KTD_Booking_Status::normalize( (string) ( $booking['status'] ?? 'new' ) );
            $stats['total']++;
            if ( isset( $stats[ $status ] ) ) {
                $stats[ $status ]++;
            }
            $stats['revenue']  += (float) ( $booking['total_amount'] ?? 0 );
            $stats['deposits'] += (float) ( $booking['deposit_amount'] ?? 0 );
        }

        usort( $bookings, fn( $a, $b ) => strcmp( $b['created_at'] ?? '', $a['created_at'] ?? '' ) );
        $recent = array_slice( $bookings, 0, 8 );
        ?>
        <div class="wrap ktd-wrap ktd-dashboard-wrap">
            <div class="ktd-dashboard-header">
                <div>
                    <h1>KTD Dashboard</h1>
                    <p>Overview of recent bookings, status counts, and revenue snapshots.</p>
                </div>
                <div class="ktd-dashboard-actions">
                    <a class="button button-primary" href="<?php echo esc_url( admin_url( 'admin.php?page=ktd-bookings' ) ); ?>">View All Bookings</a>
                    <a class="button" href="<?php echo esc_url( admin_url( 'admin.php?page=ktd-finance' ) ); ?>">Finance</a>
                </div>
            </div>

            <div class="ktd-dashboard-grid">
                <div class="ktd-dashboard-card ktd-dashboard-card-total">
                    <span class="ktd-dashboard-label">Total Bookings</span>
                    <span class="ktd-dashboard-value"><?php echo esc_html( $stats['total'] ); ?></span>
                </div>
                <div class="ktd-dashboard-card">
                    <span class="ktd-dashboard-label">New</span>
                    <span class="ktd-dashboard-value"><?php echo esc_html( $stats['new'] ); ?></span>
                </div>
                <div class="ktd-dashboard-card">
                    <span class="ktd-dashboard-label">Confirmed</span>
                    <span class="ktd-dashboard-value"><?php echo esc_html( $stats['confirmed'] ); ?></span>
                </div>
                <div class="ktd-dashboard-card">
                    <span class="ktd-dashboard-label">Deposit Paid</span>
                    <span class="ktd-dashboard-value"><?php echo esc_html( $stats['deposit_paid'] ); ?></span>
                </div>
                <div class="ktd-dashboard-card">
                    <span class="ktd-dashboard-label">Completed</span>
                    <span class="ktd-dashboard-value"><?php echo esc_html( $stats['completed'] ); ?></span>
                </div>
                <div class="ktd-dashboard-card">
                    <span class="ktd-dashboard-label">Cancelled</span>
                    <span class="ktd-dashboard-value"><?php echo esc_html( $stats['cancelled'] ); ?></span>
                </div>
                <div class="ktd-dashboard-card">
                    <span class="ktd-dashboard-label">Revenue</span>
                    <span class="ktd-dashboard-value"><?php echo esc_html( number_format( $stats['revenue'], 0 ) ); ?> THB</span>
                </div>
                <div class="ktd-dashboard-card">
                    <span class="ktd-dashboard-label">Deposits</span>
                    <span class="ktd-dashboard-value"><?php echo esc_html( number_format( $stats['deposits'], 0 ) ); ?> THB</span>
                </div>
            </div>

            <div class="ktd-dashboard-panel">
                <div class="ktd-dashboard-panel-header">
                    <h2>Recent Bookings</h2>
                    <a href="<?php echo esc_url( admin_url( 'admin.php?page=ktd-bookings' ) ); ?>">See all</a>
                </div>

                <table class="wp-list-table widefat fixed striped ktd-dashboard-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Course / Item</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if ( empty( $recent ) ) : ?>
                            <tr><td colspan="7">No bookings found.</td></tr>
                        <?php else : ?>
                            <?php foreach ( $recent as $booking ) :
                                $id      = $booking['id'] ?? '';
                                $name    = $booking['name'] ?? '—';
                                $title   = $booking['course_title'] ?? $booking['item_title'] ?? '—';
                                $status  = \KTD_Booking_Status::normalize( (string) ( $booking['status'] ?? 'new' ) );
                                $payment = (string) ( $booking['payment_status'] ?? 'unpaid' );
                                $date    = $booking['preferred_date'] ?? substr( $booking['created_at'] ?? '', 0, 10 );
                                $detail_url  = admin_url( 'admin.php?page=ktd-booking-detail&id=' . urlencode( $id ) );
                                $invoice_url  = admin_url( 'admin.php?page=ktd-invoice&id=' . urlencode( $id ) );
                            ?>
                            <tr>
                                <td><?php echo esc_html( $id ); ?></td>
                                <td><?php echo esc_html( $name ); ?></td>
                                <td><?php echo esc_html( $title ); ?></td>
                                <td><span class="ktd-badge ktd-status-<?php echo esc_attr( $status ); ?>"><?php echo esc_html( \KTD_Booking_Status::label( $status ) ); ?></span></td>
                                <td><span class="ktd-badge ktd-pay-<?php echo esc_attr( $payment ); ?>"><?php echo esc_html( ucwords( str_replace( '_', ' ', $payment ) ) ); ?></span></td>
                                <td><?php echo esc_html( $date ); ?></td>
                                <td class="ktd-actions">
                                    <a class="button button-small" href="<?php echo esc_url( $detail_url ); ?>">Edit</a>
                                    <a class="button button-small" href="<?php echo esc_url( $invoice_url ); ?>" target="_blank" rel="noopener noreferrer">Invoice</a>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <?php
    }
}