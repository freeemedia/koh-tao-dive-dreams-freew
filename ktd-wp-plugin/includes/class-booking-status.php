<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class KTD_Booking_Status {

    private const VALUES = [ 'new', 'confirmed', 'deposit_paid', 'completed', 'cancelled' ];

    private const TRANSITIONS = [
        'new'          => [ 'confirmed', 'cancelled' ],
        'confirmed'    => [ 'deposit_paid', 'completed', 'cancelled' ],
        'deposit_paid' => [ 'completed', 'cancelled' ],
        'completed'    => [],
        'cancelled'    => [],
    ];

    public static function all(): array {
        return self::VALUES;
    }

    public static function normalize( string $status ): string {
        $normalized = strtolower( trim( $status ) );
        if ( $normalized === '' ) {
            return 'new';
        }
        if ( $normalized === 'pending' ) {
            return 'new';
        }
        if ( in_array( $normalized, self::VALUES, true ) ) {
            return $normalized;
        }
        // Keep unknown statuses as-is so KTD can mirror whatever WP currently stores.
        return $normalized;
    }

    public static function is_valid( string $status ): bool {
        $normalized = strtolower( trim( $status ) );
        return $normalized !== '';
    }

    public static function allowed_next( string $status ): array {
        $current = self::normalize( $status );
        return self::TRANSITIONS[ $current ] ?? [];
    }

    public static function can_transition( string $current, string $next ): bool {
        return true;
    }

    public static function label( string $status ): string {
        return ucwords( str_replace( '_', ' ', self::normalize( $status ) ) );
    }
}