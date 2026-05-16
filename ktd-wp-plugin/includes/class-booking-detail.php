<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class KTD_Booking_Detail {

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

        $statuses  = [ 'pending', 'confirmed', 'cancelled', 'completed', 'enquiry' ];
        $payments  = [ 'unpaid', 'deposit_paid', 'paid', 'refunded' ];
        $notes     = $booking['internal_notes'] ?? '';
        $comments  = $this->parse_comments( $notes );
        $list_url  = admin_url( 'admin.php?page=ktd-bookings' );
        $invoice_url = admin_url( 'admin.php?page=ktd-invoice&id=' . urlencode( $id ) );
        ?>
        <div class="wrap ktd-wrap">
            <h1>
                Booking #<?php echo esc_html( $id ); ?>
                <a href="<?php echo esc_url( $list_url ); ?>" class="page-title-action">← All Bookings</a>
                <a href="<?php echo esc_url( $invoice_url ); ?>" class="page-title-action" target="_blank">🧾 Invoice</a>
            </h1>

            <div class="ktd-detail-grid">

                <!-- LEFT: Booking Info -->
                <div class="ktd-card">
                    <h2>Booking Details</h2>
                    <form id="ktd-edit-form" data-id="<?php echo esc_attr( $id ); ?>">
                        <?php
                        $fields = [
                            'name'                  => [ 'label' => 'Name',           'type' => 'text' ],
                            'email'                 => [ 'label' => 'Email',          'type' => 'email' ],
                            'phone'                 => [ 'label' => 'Phone',          'type' => 'text' ],
                            'course_title'          => [ 'label' => 'Course / Item',  'type' => 'text' ],
                            'preferred_date'        => [ 'label' => 'Preferred Date', 'type' => 'date' ],
                            'total_amount'          => [ 'label' => 'Total (THB)',    'type' => 'number' ],
                            'deposit_amount'        => [ 'label' => 'Deposit (THB)',  'type' => 'number' ],
                            'due_amount'            => [ 'label' => 'Due (THB)',      'type' => 'number' ],
                            'payment_link_url'      => [ 'label' => 'Payment Link',   'type' => 'url' ],
                            'bank_transfer_details' => [ 'label' => 'Bank Transfer',  'type' => 'text' ],
                        ];
                        foreach ( $fields as $key => $cfg ) :
                            $val = $booking[ $key ] ?? '';
                        ?>
                        <div class="ktd-field-row">
                            <label><?php echo esc_html( $cfg['label'] ); ?></label>
                            <input type="<?php echo esc_attr( $cfg['type'] ); ?>" name="<?php echo esc_attr( $key ); ?>"
                                   value="<?php echo esc_attr( $val ); ?>" class="regular-text">
                        </div>
                        <?php endforeach; ?>

                        <div class="ktd-field-row">
                            <label>Status</label>
                            <select name="status">
                                <?php foreach ( $statuses as $s ) : ?>
                                    <option value="<?php echo esc_attr( $s ); ?>" <?php selected( $booking['status'] ?? '', $s ); ?>><?php echo esc_html( ucfirst( $s ) ); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>

                        <div class="ktd-field-row">
                            <label>Payment Status</label>
                            <select name="payment_status">
                                <?php foreach ( $payments as $p ) : ?>
                                    <option value="<?php echo esc_attr( $p ); ?>" <?php selected( $booking['payment_status'] ?? '', $p ); ?>><?php echo esc_html( ucwords( str_replace( '_', ' ', $p ) ) ); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>

                        <div class="ktd-field-row">
                            <button type="submit" class="button button-primary">Save Changes</button>
                            <span class="ktd-save-status"></span>
                        </div>
                    </form>
                </div>

                <!-- RIGHT: Message + Comments -->
                <div class="ktd-card">
                    <h2>Customer Message</h2>
                    <div class="ktd-message-box"><?php echo nl2br( esc_html( $booking['message'] ?? '—' ) ); ?></div>

                    <h2>Internal Notes / Comments</h2>
                    <div class="ktd-comments" id="ktd-comments">
                        <?php if ( empty( $comments ) ) : ?>
                            <p class="ktd-no-comments">No comments yet.</p>
                        <?php else : ?>
                            <?php foreach ( $comments as $c ) : ?>
                                <div class="ktd-comment">
                                    <span class="ktd-comment-date"><?php echo esc_html( $c['date'] ); ?></span>
                                    <span class="ktd-comment-text"><?php echo esc_html( $c['text'] ); ?></span>
                                </div>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </div>

                    <div class="ktd-add-comment" data-id="<?php echo esc_attr( $id ); ?>">
                        <textarea id="ktd-comment-input" rows="3" placeholder="Add a note…" class="large-text"></textarea>
                        <button class="button button-secondary" id="ktd-comment-btn">Add Comment</button>
                        <span class="ktd-save-status" id="ktd-comment-status"></span>
                    </div>
                </div>

            </div>
        </div>
        <?php
    }

    private function parse_comments( string $notes ): array {
        $comments = [];
        foreach ( explode( "\n", $notes ) as $line ) {
            $line = trim( $line );
            if ( preg_match( '/^\[([^\]]+)\]\s+Admin:\s+(.+)$/', $line, $m ) ) {
                $comments[] = [
                    'date' => gmdate( 'd M Y H:i', strtotime( $m[1] ) ),
                    'text' => $m[2],
                ];
            }
        }
        return $comments;
    }
}
