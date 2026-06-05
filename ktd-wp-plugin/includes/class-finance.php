<?php
if ( ! defined( 'ABSPATH' ) ) exit;

require_once __DIR__ . '/class-api-client.php';

class KTD_Finance {

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

        // Filter to paid/confirmed only for revenue calculations
        $filter_year = (int) ( $_GET['year'] ?? gmdate( 'Y' ) );

        $by_month    = [];
        $by_type     = [];
        $by_status   = [];
        $total_rev   = 0;
        $total_dep   = 0;

        foreach ( $bookings as $b ) {
            $created = $b['created_at'] ?? $b['preferred_date'] ?? '';
            $year    = (int) substr( $created, 0, 4 );
            if ( $year !== $filter_year ) continue;

            $month   = substr( $created, 0, 7 ); // YYYY-MM
            $type    = $b['booking_type'] ?? 'unknown';
            $status  = \KTD_Booking_Status::normalize( (string) ( $b['status'] ?? 'new' ) );
            $total   = (float) ( $b['total_amount'] ?? 0 );
            $deposit = (float) ( $b['deposit_amount'] ?? 0 );

            $by_month[ $month ]  = ( $by_month[ $month ] ?? 0 ) + $total;
            $by_type[ $type ]    = ( $by_type[ $type ] ?? 0 ) + $total;
            $by_status[ $status ] = ( $by_status[ $status ] ?? 0 ) + 1;
            $total_rev  += $total;
            $total_dep  += $deposit;
        }

        ksort( $by_month );
        arsort( $by_type );

        $available_years = array_unique( array_map( fn( $b ) => (int) substr( $b['created_at'] ?? '', 0, 4 ), $bookings ) );
        rsort( $available_years );
        ?>
        <div class="wrap ktd-wrap">
            <h1>Finance Summary</h1>

            <form method="get" class="ktd-filters">
                <input type="hidden" name="page" value="ktd-finance">
                <select name="year">
                    <?php foreach ( $available_years as $y ) : ?>
                        <option value="<?php echo esc_attr( $y ); ?>" <?php selected( $filter_year, $y ); ?>><?php echo esc_html( $y ); ?></option>
                    <?php endforeach; ?>
                </select>
                <?php submit_button( 'Filter', 'secondary', '', false ); ?>
            </form>

            <!-- Summary Cards -->
            <div class="ktd-stat-cards">
                <div class="ktd-stat-card">
                    <span class="ktd-stat-label">Total Revenue</span>
                    <span class="ktd-stat-value"><?php echo number_format( $total_rev, 0 ); ?> THB</span>
                </div>
                <div class="ktd-stat-card">
                    <span class="ktd-stat-label">Total Deposits</span>
                    <span class="ktd-stat-value"><?php echo number_format( $total_dep, 0 ); ?> THB</span>
                </div>
                <div class="ktd-stat-card">
                    <span class="ktd-stat-label">Balance Due</span>
                    <span class="ktd-stat-value"><?php echo number_format( max( 0, $total_rev - $total_dep ), 0 ); ?> THB</span>
                </div>
                <div class="ktd-stat-card">
                    <span class="ktd-stat-label">Total Bookings</span>
                    <span class="ktd-stat-value"><?php echo array_sum( $by_status ); ?></span>
                </div>
            </div>

            <div class="ktd-finance-grid">

                <!-- Monthly Breakdown -->
                <div class="ktd-card">
                    <h2>Monthly Revenue – <?php echo esc_html( $filter_year ); ?></h2>
                    <table class="wp-list-table widefat fixed striped">
                        <thead><tr><th>Month</th><th>Revenue (THB)</th></tr></thead>
                        <tbody>
                            <?php if ( empty( $by_month ) ) : ?>
                                <tr><td colspan="2">No data for <?php echo esc_html( $filter_year ); ?></td></tr>
                            <?php else : ?>
                                <?php foreach ( $by_month as $month => $amount ) : ?>
                                    <tr>
                                        <td><?php echo esc_html( gmdate( 'F Y', strtotime( $month . '-01' ) ) ); ?></td>
                                        <td><?php echo number_format( $amount, 0 ); ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>

                <!-- By Type -->
                <div class="ktd-card">
                    <h2>Revenue by Type</h2>
                    <table class="wp-list-table widefat fixed striped">
                        <thead><tr><th>Type</th><th>Revenue (THB)</th></tr></thead>
                        <tbody>
                            <?php foreach ( $by_type as $type => $amount ) : ?>
                                <tr>
                                    <td><?php echo esc_html( ucfirst( $type ) ); ?></td>
                                    <td><?php echo number_format( $amount, 0 ); ?></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>

                    <h2 style="margin-top:24px">Bookings by Status</h2>
                    <table class="wp-list-table widefat fixed striped">
                        <thead><tr><th>Status</th><th>Count</th></tr></thead>
                        <tbody>
                            <?php foreach ( $by_status as $status => $count ) : ?>
                                <tr>
                                    <td><span class="ktd-badge ktd-status-<?php echo esc_attr( $status ); ?>"><?php echo esc_html( $status ); ?></span></td>
                                    <td><?php echo esc_html( $count ); ?></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <?php
    }
}
