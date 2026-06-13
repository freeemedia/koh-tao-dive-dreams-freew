<?php
if ( ! defined( 'ABSPATH' ) ) exit;

require_once __DIR__ . '/class-api-client.php';

class KTD_Booking_Detail {

    private \KTD_API_Client $api;

    public function __construct() {
        $this->api = new \KTD_API_Client();
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

        $current_status     = \KTD_Booking_Status::normalize( (string) ( $booking['status'] ?? 'new' ) );
        $editable_statuses  = array_values( array_unique( array_merge(
            [ $current_status ],
            \KTD_Booking_Status::all()
        ) ) );
        $payments  = [ 'unpaid', 'deposit_paid', 'paid', 'refunded' ];
        $notes     = trim( (string) ( $booking['internal_notes'] ?? $booking['comments'] ?? '' ) );
        $notes_key = strtolower( preg_replace( '/[^a-z]/', '', $notes ) ?? '' );
        if ( $notes_key === 'wordpress' || $notes_key === 'wordrpress' || str_starts_with( $notes_key, 'wordpress' ) ) {
            $notes = '';
        }
        $message   = trim( (string) ( $booking['message'] ?? '' ) );
        $message_key = strtolower( preg_replace( '/[^a-z]/', '', $message ) ?? '' );
        if ( $message_key === 'wordpress' || $message_key === 'wordrpress' || str_starts_with( $message_key, 'wordpress' ) ) {
            $message = '';
        }
        $comments  = $this->parse_comments( $notes );
        $list_url  = admin_url( 'admin.php?page=ktd-bookings' );
        $finance_url = admin_url( 'admin.php?page=ktd-finance' );
        $invoice_url = admin_url( 'admin.php?page=ktd-invoice&id=' . urlencode( $id ) );
        $payment_url = trim( (string) ( $booking['payment_link_url'] ?? $booking['paypal_link_url'] ?? '' ) );
        ?>
        <div class="wrap ktd-wrap">
            <h1>
                Booking #<?php echo esc_html( $id ); ?>
                <a href="<?php echo esc_url( $list_url ); ?>" class="page-title-action">← All Bookings</a>
                <a href="<?php echo esc_url( $finance_url ); ?>" class="page-title-action">💰 Finance</a>
                <a href="<?php echo esc_url( $invoice_url ); ?>" class="page-title-action" target="_blank" rel="noopener noreferrer">🧾 Invoice</a>
                <?php if ( $payment_url ) : ?>
                    <a href="<?php echo esc_url( $payment_url ); ?>" class="page-title-action" target="_blank" rel="noopener noreferrer">🔗 Payment Link</a>
                <?php endif; ?>
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
                                <?php foreach ( $editable_statuses as $s ) : ?>
                                    <option value="<?php echo esc_attr( $s ); ?>" <?php selected( $current_status, $s ); ?>><?php echo esc_html( \KTD_Booking_Status::label( $s ) ); ?></option>
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
                        <textarea name="internal_notes" id="ktd-internal-notes-hidden" style="display:none;"><?php echo esc_textarea( $notes ); ?></textarea>
                    </form>
                </div>

                <!-- RIGHT: Message + Comments -->
                <div class="ktd-card">
                    <h2>Customer Message</h2>
                    <div class="ktd-message-box"><?php echo nl2br( esc_html( $message !== '' ? $message : '—' ) ); ?></div>

                    <h2>Comments (Editable)</h2>
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
                        <label for="ktd-comments-editor"><strong>Edit Comments</strong></label>
                        <textarea id="ktd-comments-editor" rows="6" placeholder="Edit internal comments…" class="large-text"><?php echo esc_textarea( $notes ); ?></textarea>
                        <p class="description">Directly edit and save all comments for this booking.</p>
                        <button class="button button-secondary" id="ktd-save-comments-btn">Save Comments</button>
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
            $line_key = strtolower( preg_replace( '/[^a-z]/', '', $line ) ?? '' );
            if ( $line === '' || $line_key === 'wordpress' || $line_key === 'wordrpress' || str_starts_with( $line_key, 'wordpress' ) ) {
                continue;
            }

            if ( preg_match( '/^\[([^\]]+)\]\s+Admin:\s+(.+)$/', $line, $m ) ) {
                $comments[] = [
                    'date' => gmdate( 'd M Y H:i', strtotime( $m[1] ) ),
                    'text' => $m[2],
                ];
                continue;
            }

            // Show plain note lines as comments too for legacy data formats.
            $comments[] = [
                'date' => 'Note',
                'text' => $line,
            ];
        }
        return $comments;
    }
}
