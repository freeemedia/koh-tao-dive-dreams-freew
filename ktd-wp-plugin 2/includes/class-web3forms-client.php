<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class KTD_Web3Forms_Client {

    private string $access_key;

    public function __construct() {
        $this->access_key = get_option( 'ktd_web3forms_access_key', '' );
    }

    /**
     * Send booking notification via Web3Forms
     * 
     * @param array $booking_data Booking details
     * @return array|WP_Error Result or error
     */
    public function send_booking_notification( array $booking_data ): array|WP_Error {
        if ( empty( $this->access_key ) ) {
            return new WP_Error( 'no_access_key', 'Web3Forms access key not configured' );
        }

        $subject = $this->build_subject( $booking_data );
        $message = $this->build_message( $booking_data );
        
        $payload = [
            'access_key' => $this->access_key,
            'subject'   => $subject,
            'from_name' => 'Go. Pro Diving Asia',
            'email'     => $booking_data['email'] ?? 'noreply@divinginasia.com',
            'message'   => $message,
        ];

        // Add custom fields
        foreach ( $booking_data as $key => $value ) {
            if ( ! in_array( $key, [ 'subject', 'from_name', 'email', 'message', 'access_key' ] ) ) {
                $payload[ $key ] = $value;
            }
        }

        $response = wp_remote_post( 'https://api.web3forms.com/submit', [
            'timeout' => 20,
            'headers' => [
                'Content-Type' => 'application/json',
            ],
            'body' => wp_json_encode( $payload ),
        ] );

        return $this->parse_response( $response );
    }

    private function build_subject( array $booking_data ): string {
        $title = $booking_data['item_title'] ?? $booking_data['course_title'] ?? 'Diving Package';
        $name = $booking_data['name'] ?? 'Customer';
        return "New Booking: {$title} - {$name}";
    }

    private function build_message( array $booking_data ): string {
        $lines = [];
        
        $lines[] = "=== NEW BOOKING INQUIRY ===";
        $lines[] = "";
        
        if ( ! empty( $booking_data['name'] ) ) {
            $lines[] = "Name: " . $booking_data['name'];
        }
        if ( ! empty( $booking_data['email'] ) ) {
            $lines[] = "Email: " . $booking_data['email'];
        }
        if ( ! empty( $booking_data['phone'] ) ) {
            $lines[] = "Phone: " . $booking_data['phone'];
        }
        if ( ! empty( $booking_data['item_title'] ) || ! empty( $booking_data['course_title'] ) ) {
            $lines[] = "Course: " . ( $booking_data['item_title'] ?? $booking_data['course_title'] );
        }
        if ( ! empty( $booking_data['preferred_date'] ) ) {
            $lines[] = "Preferred Date: " . $booking_data['preferred_date'];
        }
        if ( ! empty( $booking_data['accommodation'] ) ) {
            $lines[] = "Accommodation: " . $booking_data['accommodation'];
        }
        if ( ! empty( $booking_data['total_amount'] ) ) {
            $lines[] = "Total Amount: ฿" . number_format( $booking_data['total_amount'] );
        }
        if ( ! empty( $booking_data['deposit_amount'] ) ) {
            $lines[] = "Deposit Amount: ฿" . number_format( $booking_data['deposit_amount'] );
        }
        if ( ! empty( $booking_data['status'] ) ) {
            $lines[] = "Status: " . $booking_data['status'];
        }
        
        $lines[] = "";
        
        if ( ! empty( $booking_data['message'] ) || ! empty( $booking_data['internal_notes'] ) ) {
            $lines[] = "Message/Notes:";
            $lines[] = $booking_data['message'] ?? $booking_data['internal_notes'] ?? '';
        }
        
        $lines[] = "";
        $lines[] = "=== END OF BOOKING ===";
        
        return implode( "\n", $lines );
    }

    private function parse_response( $response ): array|WP_Error {
        if ( is_wp_error( $response ) ) {
            return $response;
        }

        $code = wp_remote_retrieve_response_code( $response );
        $body = wp_remote_retrieve_body( $response );
        $data = json_decode( $body, true );

        if ( $code >= 200 && $code < 300 ) {
            return is_array( $data ) ? $data : [ 'success' => true ];
        }

        $message = $data['message'] ?? $data['error'] ?? "Web3Forms error (HTTP {$code})";
        return new WP_Error( 'web3forms_error', $message );
    }
}
