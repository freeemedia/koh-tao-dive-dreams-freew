<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class KTD_Invoice {

    private KTD_API_Client $api;

    public function __construct() {
        $this->api = new KTD_API_Client();
    }

    public function render(): void {
        $id = sanitize_text_field( $_GET['id'] ?? '' );
        if ( ! $id ) {
            echo '<div class="wrap"><p>No booking ID specified.</p></div>';
            return;
        }

        $booking = $this->api->get_booking( $id );
        if ( is_wp_error( $booking ) ) {
            echo '<div class="wrap"><div class="notice notice-error"><p>' . esc_html( $booking->get_error_message() ) . '</p></div></div>';
            return;
        }

        $title    = $booking['course_title'] ?? $booking['item_title'] ?? 'Service';
        $total    = number_format( (float) ( $booking['total_amount'] ?? 0 ), 2 );
        $deposit  = number_format( (float) ( $booking['deposit_amount'] ?? 0 ), 2 );
        $due      = number_format( (float) ( $booking['due_amount'] ?? max( 0, (float)($booking['total_amount']??0) - (float)($booking['deposit_amount']??0) ) ), 2 );
        $date     = $booking['preferred_date'] ?? substr( $booking['created_at'] ?? '', 0, 10 );
        $inv_num  = 'INV-' . str_pad( $id, 5, '0', STR_PAD_LEFT );
        $today    = gmdate( 'd M Y' );
        $logo_url = KTD_BOOKINGS_URL . 'assets/logo.png';
        ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Invoice <?php echo esc_html( $inv_num ); ?></title>
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { font-family: Arial, sans-serif; font-size: 13px; color: #222; background: #fff; padding: 40px; }
                .invoice-wrap { max-width: 720px; margin: 0 auto; }
                .inv-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 36px; }
                .inv-header .company h1 { font-size: 22px; color: #0077aa; }
                .inv-header .company p { color: #555; margin-top: 4px; font-size: 12px; }
                .inv-header .inv-meta { text-align: right; }
                .inv-meta h2 { font-size: 28px; color: #0077aa; letter-spacing: 2px; }
                .inv-meta p { margin-top: 4px; color: #555; }
                .inv-parties { display: flex; gap: 40px; margin-bottom: 32px; }
                .inv-parties .party h3 { font-size: 11px; text-transform: uppercase; color: #888; margin-bottom: 6px; letter-spacing: 1px; }
                .inv-parties .party p { line-height: 1.6; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
                thead tr { background: #0077aa; color: #fff; }
                thead th { padding: 10px 12px; text-align: left; font-size: 12px; }
                tbody tr:nth-child(even) { background: #f5f9fc; }
                tbody td { padding: 10px 12px; border-bottom: 1px solid #e0e0e0; }
                .inv-totals { margin-left: auto; width: 280px; }
                .inv-totals table { margin-bottom: 0; }
                .inv-totals td { padding: 6px 12px; }
                .inv-totals tr.grand-total td { font-weight: bold; font-size: 15px; border-top: 2px solid #0077aa; color: #0077aa; }
                .inv-footer { margin-top: 40px; border-top: 1px solid #e0e0e0; padding-top: 16px; color: #888; font-size: 11px; text-align: center; }
                .badge { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
                .badge-confirmed { background: #d4edda; color: #155724; }
                .badge-pending   { background: #fff3cd; color: #856404; }
                .badge-paid      { background: #d4edda; color: #155724; }
                .badge-unpaid    { background: #f8d7da; color: #721c24; }
                @media print {
                    body { padding: 20px; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
        <div class="invoice-wrap">

            <div class="inv-header">
                <div class="company">
                    <h1>Pro Diving Asia</h1>
                    <p>Koh Tao, Surat Thani, Thailand<br>
                    Email: info@divinginasia.com<br>
                    Web: www.divinginasia.com</p>
                </div>
                <div class="inv-meta">
                    <h2>INVOICE</h2>
                    <p><strong><?php echo esc_html( $inv_num ); ?></strong></p>
                    <p>Issued: <?php echo esc_html( $today ); ?></p>
                    <p>
                        <span class="badge badge-<?php echo esc_attr( $booking['status'] ?? 'pending' ); ?>">
                            <?php echo esc_html( $booking['status'] ?? 'pending' ); ?>
                        </span>
                        &nbsp;
                        <span class="badge badge-<?php echo esc_attr( $booking['payment_status'] ?? 'unpaid' ); ?>">
                            <?php echo esc_html( $booking['payment_status'] ?? 'unpaid' ); ?>
                        </span>
                    </p>
                </div>
            </div>

            <div class="inv-parties">
                <div class="party">
                    <h3>Bill To</h3>
                    <p>
                        <strong><?php echo esc_html( $booking['name'] ?? '—' ); ?></strong><br>
                        <?php echo esc_html( $booking['email'] ?? '' ); ?><br>
                        <?php echo esc_html( $booking['phone'] ?? '' ); ?>
                    </p>
                </div>
                <div class="party">
                    <h3>Service Date</h3>
                    <p><?php echo esc_html( $date ?: '—' ); ?></p>
                </div>
                <div class="party">
                    <h3>Booking Type</h3>
                    <p><?php echo esc_html( ucfirst( $booking['booking_type'] ?? '—' ) ); ?></p>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th width="80">Qty</th>
                        <th width="140">Amount (THB)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><?php echo esc_html( $title ); ?><?php if ( $booking['message'] ?? '' ) echo '<br><small style="color:#888">' . esc_html( substr( $booking['message'], 0, 120 ) ) . '</small>'; ?></td>
                        <td>1</td>
                        <td><?php echo esc_html( $total ); ?></td>
                    </tr>
                </tbody>
            </table>

            <div class="inv-totals">
                <table>
                    <tr>
                        <td>Subtotal</td>
                        <td align="right"><?php echo esc_html( $total ); ?> THB</td>
                    </tr>
                    <?php if ( (float) $booking['deposit_amount'] ?? 0 ) : ?>
                    <tr>
                        <td>Deposit Paid</td>
                        <td align="right">– <?php echo esc_html( $deposit ); ?> THB</td>
                    </tr>
                    <?php endif; ?>
                    <tr class="grand-total">
                        <td>Balance Due</td>
                        <td align="right"><?php echo esc_html( $due ); ?> THB</td>
                    </tr>
                </table>
            </div>

            <?php if ( $booking['bank_transfer_details'] ?? '' ) : ?>
            <div style="margin-top:32px; padding:16px; background:#f5f9fc; border-radius:6px; font-size:12px;">
                <strong>Bank Transfer Details:</strong><br>
                <?php echo nl2br( esc_html( $booking['bank_transfer_details'] ) ); ?>
            </div>
            <?php endif; ?>

            <?php if ( $booking['payment_link_url'] ?? '' ) : ?>
            <div style="margin-top:16px; font-size:12px;">
                <strong>Online Payment:</strong>
                <a href="<?php echo esc_url( $booking['payment_link_url'] ); ?>"><?php echo esc_html( $booking['payment_link_url'] ); ?></a>
            </div>
            <?php endif; ?>

            <div class="inv-footer">
                Thank you for diving with Pro Diving Asia! 🤿 &nbsp;|&nbsp; www.divinginasia.com
            </div>

            <div class="no-print" style="text-align:center; margin-top:32px;">
                <button onclick="window.print()" style="padding:10px 28px;background:#0077aa;color:#fff;border:none;border-radius:6px;font-size:14px;cursor:pointer;">🖨 Print / Save PDF</button>
            </div>

        </div>
        </body>
        </html>
        <?php
        // Exit early — this page is a standalone print view, not wrapped in WP chrome
        exit;
    }
}
