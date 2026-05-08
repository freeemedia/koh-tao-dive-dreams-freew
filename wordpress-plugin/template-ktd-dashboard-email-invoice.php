<?php
/**
 * Template Name: KTD Dashboard Home (Email Invoice)
 *
 * Redirects this legacy template to the main KTD dashboard page.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! is_user_logged_in() ) {
    auth_redirect();
}

if ( ! current_user_can( 'manage_options' ) ) {
    wp_die( __( 'You do not have permission to view this page.' ) );
}

$dashboard_page_ids = get_posts(
    [
        'post_type'      => 'page',
        'post_status'    => 'publish',
        'posts_per_page' => 1,
        'meta_key'       => '_wp_page_template',
        'meta_value'     => 'template-ktd-dashboard.php',
        'fields'         => 'ids',
    ]
);

$dashboard_page_id = ! empty( $dashboard_page_ids ) ? (int) $dashboard_page_ids[0] : 0;
$current_page_id   = get_queried_object_id();

if ( $dashboard_page_id > 0 && $dashboard_page_id !== $current_page_id ) {
    wp_safe_redirect( get_permalink( $dashboard_page_id ), 302 );
    exit;
}

wp_safe_redirect( admin_url( 'admin.php?page=ktd-bookings' ), 302 );
exit;
