<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class KTD_API_Client {

    private $base_url;
    private $token;

    public function __construct() {
        $this->base_url = rtrim( get_option( 'ktd_api_url', 'https://koh-tao-dive-dreams.vercel.app' ), '/' );
        $this->token    = get_option( 'ktd_admin_token', '' );
    }

    private function auth_headers() {
        return [
            'x-admin-login-token' => $this->token,
            'Content-Type'        => 'application/json',
        ];
    }

    /** Fetch all bookings. Returns array or WP_Error. */
    public function get_bookings( $filters = array() ) {
        $url      = $this->base_url . '/api/bookings';
        $response = wp_remote_get( $url, [
            'timeout' => 20,
            'headers' => $this->auth_headers(),
        ] );
        return $this->parse_response( $response );
    }

    /** Fetch a single booking by id. */
    public function get_booking( $id ) {
        $bookings = $this->get_bookings();
        if ( is_wp_error( $bookings ) ) return $bookings;
        foreach ( $bookings as $b ) {
            if ( (string) ( $b['id'] ?? '' ) === $id ) return $b;
        }
        return new WP_Error( 'not_found', "Booking #{$id} not found" );
    }

    /** PATCH a booking. Returns updated booking or WP_Error. */
    public function patch_booking( $id, $updates ) {
        $url      = $this->base_url . '/api/bookings/' . urlencode( $id );
        $response = wp_remote_request( $url, [
            'method'  => 'PUT',
            'timeout' => 20,
            'headers' => $this->auth_headers(),
            'body'    => wp_json_encode( $updates ),
        ] );
        return $this->parse_response( $response );
    }

    /** DELETE a booking. */
    public function delete_booking( $id ) {
        $url      = $this->base_url . '/api/bookings/' . urlencode( $id );
        $response = wp_remote_request( $url, [
            'method'  => 'DELETE',
            'timeout' => 20,
            'headers' => $this->auth_headers(),
        ] );
        if ( is_wp_error( $response ) ) return $response;
        $code = wp_remote_retrieve_response_code( $response );
        return $code >= 200 && $code < 300;
    }

    private function parse_response( $response ) {
        if ( is_wp_error( $response ) ) return $response;
        $code = wp_remote_retrieve_response_code( $response );
        $body = wp_remote_retrieve_body( $response );
        $data = json_decode( $body, true );
        if ( $code < 200 || $code >= 300 ) {
            $message = $data['error'] ?? "API error (HTTP {$code})";
            return new WP_Error( 'api_error', $message );
        }
        return is_array( $data ) ? $data : [];
    }
}
