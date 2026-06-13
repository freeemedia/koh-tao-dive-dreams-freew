<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class KTD_API_Client {

    private const BOOKINGS_PATH = '/api/bookings';
    private const WP_BOOKINGS_PATH = '/bookings';

    private string $base_url;
    private string $token;
    private string $wp_api_key;

    public function __construct() {
        $configured_base = trim( (string) get_option( 'ktd_api_url', '' ) );
        $default_remote  = 'https://api.divinginasia.com';
        $local_base      = rtrim( home_url( '/wp-json/ktd/v1' ), '/' );

        // If the storage plugin is active on this site, default to local REST for real-time sync.
        if ( $configured_base === '' || ( $configured_base === $default_remote && class_exists( 'KTD_Booking_Manager' ) ) ) {
            $this->base_url = $local_base;
        } else {
            $this->base_url = rtrim( $configured_base, '/' );
        }

        $this->token    = get_option( 'ktd_admin_token', '' );
        $this->wp_api_key = get_option( 'ktd_booking_api_key', '' );
    }

    private function is_local_wp_api(): bool {
        return str_contains( $this->base_url, '/wp-json/ktd/v1' );
    }

    private function bookings_url( ?string $id = null ): string {
        if ( $this->is_local_wp_api() ) {
            return $this->base_url . self::WP_BOOKINGS_PATH . ( $id !== null ? '/' . rawurlencode( $id ) : '' );
        }

        if ( $id !== null ) {
            return $this->base_url . self::BOOKINGS_PATH . '?id=' . rawurlencode( $id );
        }

        return $this->base_url . self::BOOKINGS_PATH;
    }

    private function auth_headers(): array {
        $headers = [
            'Content-Type'        => 'application/json',
            'x-admin-login-token' => $this->token,
        ];

        if ( $this->is_local_wp_api() && $this->wp_api_key !== '' ) {
            $headers['x-ktd-api-key'] = $this->wp_api_key;
        }

        return $headers;
    }

    private function normalize_placeholder_note( mixed $value ): string {
        $note = trim( (string) $value );
        if ( $note === '' ) {
            return '';
        }

        $normalized = strtolower( preg_replace( '/[^a-z]/', '', $note ) ?? '' );
        if ( $normalized === 'wordpress' || $normalized === 'wordrpress' || str_starts_with( $normalized, 'wordpress' ) ) {
            return '';
        }

        return $note;
    }

    private function sanitize_booking( array $booking ): array {
        $item_type    = trim( (string) ( $booking['item_type'] ?? '' ) );
        $booking_type = trim( (string) ( $booking['booking_type'] ?? '' ) );
        if ( $item_type === '' && $booking_type !== '' ) {
            $item_type = $booking_type;
        }
        if ( $booking_type === '' && $item_type !== '' ) {
            $booking_type = $item_type;
        }
        $booking['item_type'] = $item_type;
        $booking['booking_type'] = $booking_type;

        $booking_source = trim( (string) ( $booking['booking_source'] ?? '' ) );
        $source         = trim( (string) ( $booking['source'] ?? '' ) );
        if ( $source === '' && $booking_source !== '' ) {
            $source = $booking_source;
        }
        if ( $booking_source === '' && $source !== '' ) {
            $booking_source = $source;
        }
        $booking['source'] = strtolower( $source ) === 'wordpress' ? '' : $source;
        $booking['booking_source'] = strtolower( $booking_source ) === 'wordpress' ? '' : $booking_source;

        $internal_notes = array_key_exists( 'internal_notes', $booking ) ? $this->normalize_placeholder_note( $booking['internal_notes'] ) : '';
        $comments       = array_key_exists( 'comments', $booking ) ? $this->normalize_placeholder_note( $booking['comments'] ) : '';
        $message        = array_key_exists( 'message', $booking ) ? $this->normalize_placeholder_note( $booking['message'] ) : '';
        $resolved_notes = $internal_notes !== '' ? $internal_notes : ( $comments !== '' ? $comments : '' );

        // Keep aliases in sync so UI never shows stale placeholder notes.
        $booking['internal_notes'] = $resolved_notes;
        $booking['comments'] = $resolved_notes;
        $booking['message'] = $message;

        return $booking;
    }

    private function sanitize_booking_list( mixed $rows ): array {
        if ( ! is_array( $rows ) ) {
            return [];
        }

        return array_map( function ( $row ) {
            return is_array( $row ) ? $this->sanitize_booking( $row ) : [];
        }, $rows );
    }

    /** Fetch all bookings. Returns array or \WP_Error. */
    public function get_bookings( array $filters = [] ): array|\WP_Error {
        $url      = $this->bookings_url();
        $response = wp_remote_get( $url, [
            'timeout' => 20,
            'headers' => $this->auth_headers(),
        ] );
        return $this->parse_response( $response, true );
    }

    /** Fetch a single booking by id. */
    public function get_booking( string $id ): array|\WP_Error {
        if ( $this->is_local_wp_api() ) {
            $response = wp_remote_get( $this->bookings_url( $id ), [
                'timeout' => 20,
                'headers' => $this->auth_headers(),
            ] );

            $parsed = $this->parse_response( $response, false );
            if ( is_wp_error( $parsed ) ) {
                return $parsed;
            }

            if ( is_array( $parsed ) && isset( $parsed['booking'] ) && is_array( $parsed['booking'] ) ) {
                return $parsed['booking'];
            }

            if ( is_array( $parsed ) && isset( $parsed['id'] ) ) {
                return $parsed;
            }
        }

        $bookings = $this->get_bookings();
        if ( is_wp_error( $bookings ) ) return $bookings;
        foreach ( $bookings as $b ) {
            if ( (string) ( $b['id'] ?? '' ) === $id ) return $b;
        }
        return new \WP_Error( 'not_found', "Booking #{$id} not found" );
    }

    /** PATCH a booking. Returns updated booking or \WP_Error. */
    public function patch_booking( string $id, array $updates ): array|\WP_Error {
        $response = wp_remote_request( $this->is_local_wp_api() ? $this->bookings_url( $id ) : $this->bookings_url(), [
            'method'  => $this->is_local_wp_api() ? 'PATCH' : 'POST',
            'timeout' => 20,
            'headers' => $this->auth_headers(),
            'body'    => wp_json_encode( $this->is_local_wp_api() ? $updates : array_merge( [
                'mode' => 'update',
                'id'   => $id,
            ], $updates ) ),
        ] );

        $parsed = $this->parse_response( $response, false );
        if ( is_wp_error( $parsed ) ) {
            return $parsed;
        }

        if ( is_array( $parsed ) && isset( $parsed['booking'] ) && is_array( $parsed['booking'] ) ) {
            return $parsed['booking'];
        }

        return is_array( $parsed ) ? $parsed : [];
    }

    /** DELETE a booking. */
    public function delete_booking( string $id ): bool|\WP_Error {
        $response = wp_remote_request( $this->bookings_url( $id ), [
            'method'  => 'DELETE',
            'timeout' => 20,
            'headers' => $this->auth_headers(),
        ] );
        if ( is_wp_error( $response ) ) return $response;
        $code = wp_remote_retrieve_response_code( $response );
        return $code >= 200 && $code < 300;
    }

    private function parse_response( $response, bool $expect_list ): array|\WP_Error {
        if ( is_wp_error( $response ) ) return $response;
        $code = wp_remote_retrieve_response_code( $response );
        $body = wp_remote_retrieve_body( $response );
        $data = json_decode( $body, true );
        if ( $code < 200 || $code >= 300 ) {
            $message = $data['error'] ?? "API error (HTTP {$code})";
            return new \WP_Error( 'api_error', $message );
        }

        if ( $this->is_local_wp_api() ) {
            if ( is_array( $data ) && isset( $data['success'] ) && $data['success'] === true ) {
                if ( $expect_list ) {
                    return $this->sanitize_booking_list( $data['data'] ?? [] );
                }

                if ( isset( $data['booking'] ) && is_array( $data['booking'] ) ) {
                    $data['booking'] = $this->sanitize_booking( $data['booking'] );
                }

                if ( isset( $data['data'] ) && is_array( $data['data'] ) && isset( $data['data']['id'] ) ) {
                    $data['data'] = $this->sanitize_booking( $data['data'] );
                }

                return $data;
            }

            return is_array( $data ) ? $data : [];
        }

        if ( is_array( $data ) && isset( $data['bookings'] ) && is_array( $data['bookings'] ) ) {
            return $this->sanitize_booking_list( $data['bookings'] );
        }

        if ( is_array( $data ) && isset( $data['id'] ) ) {
            return $this->sanitize_booking( $data );
        }

        return is_array( $data ) ? $data : [];
    }
}
