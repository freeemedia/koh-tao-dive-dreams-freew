<?php
/**
 * Plugin Name: Lembongan Booking Export
 * Plugin URI: https://divinginasia.com
 * Description: Exports WPForms booking submissions to Jira and/or Trello. Configure via Settings → Booking Export.
 * Version: 1.0.0
 * Author: Pro Diving Asia
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Text Domain: lembongan-booking-export
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class LBE_Booking_Export {

    private const OPTION_KEY  = 'lbe_settings';
    private const MENU_SLUG   = 'lbe-booking-export';
    private const NONCE_ACTION = 'lbe_save_settings';

    // -------------------------------------------------------------------------
    // Bootstrap
    // -------------------------------------------------------------------------

    public static function init(): void {
        add_action( 'admin_menu',    [ self::class, 'add_menu' ] );
        add_action( 'admin_init',    [ self::class, 'register_settings' ] );
        add_action( 'admin_notices', [ self::class, 'admin_notices' ] );

        // WPForms fires this action after a successful submission.
        // $fields    = array of submitted field objects
        // $entry     = WPForms_Entry object (only available with WPForms Pro)
        // $form_data = form configuration array
        add_action( 'wpforms_process_complete', [ self::class, 'on_form_submitted' ], 10, 4 );
    }

    // -------------------------------------------------------------------------
    // WPForms hook
    // -------------------------------------------------------------------------

    /**
     * Called by WPForms after every successful form submission.
     *
     * @param array $fields    Submitted field data keyed by field ID.
     * @param array $entry     Raw $_POST entry (or WPForms_Entry on Pro).
     * @param array $form_data Full form configuration.
     * @param int   $entry_id  Saved entry ID (0 when entries not stored).
     */
    public static function on_form_submitted( $fields, $entry, $form_data, $entry_id ): void {
        $settings = self::get_settings();

        // --- Check whether this form should be exported ----------------------
        $watch_ids = array_filter( array_map( 'trim', explode( ',', $settings['form_ids'] ) ) );
        $form_id   = absint( $form_data['id'] ?? 0 );

        if ( ! empty( $watch_ids ) && ! in_array( (string) $form_id, $watch_ids, true ) ) {
            return; // Not a watched form — ignore.
        }

        // --- Build a flat booking summary from the submitted fields ----------
        $summary = self::build_summary( $fields, $form_data );
        $title   = sprintf(
            '[Booking] %s – %s',
            $summary['activity'] ?: ( $form_data['settings']['form_title'] ?? 'Watersport' ),
            $summary['name']     ?: 'Guest'
        );

        // --- Export to each enabled destination ------------------------------
        $errors = [];

        if ( ! empty( $settings['trello_api_key'] ) && ! empty( $settings['trello_token'] ) && ! empty( $settings['trello_list_id'] ) ) {
            $err = self::export_to_trello( $title, $summary, $settings );
            if ( $err ) {
                $errors[] = 'Trello: ' . $err;
            }
        }

        if ( ! empty( $settings['jira_base_url'] ) && ! empty( $settings['jira_email'] ) && ! empty( $settings['jira_api_token'] ) && ! empty( $settings['jira_project_key'] ) ) {
            $err = self::export_to_jira( $title, $summary, $settings );
            if ( $err ) {
                $errors[] = 'Jira: ' . $err;
            }
        }

        if ( ! empty( $errors ) ) {
            error_log( '[LBE] Export errors for form ' . $form_id . ': ' . implode( ' | ', $errors ) );
        }
    }

    // -------------------------------------------------------------------------
    // Build summary
    // -------------------------------------------------------------------------

    /**
     * Walk all submitted fields and extract recognisable booking data.
     * Any field that doesn't match a known label is stored in extras[].
     *
     * @param array $fields    WPForms submitted field array.
     * @param array $form_data Form configuration.
     * @return array
     */
    private static function build_summary( array $fields, array $form_data ): array {
        $summary = [
            'name'     => '',
            'email'    => '',
            'phone'    => '',
            'activity' => '',
            'date'     => '',
            'guests'   => '',
            'message'  => '',
            'extras'   => [],
            'form_title' => $form_data['settings']['form_title'] ?? '',
        ];

        // WPForms $fields is keyed by field ID; each item has 'name' and 'value'.
        foreach ( $fields as $field ) {
            $label = strtolower( trim( $field['name'] ?? '' ) );
            $value = trim( $field['value'] ?? '' );

            if ( $value === '' ) {
                continue;
            }

            if ( $field['type'] === 'name' || str_contains( $label, 'name' ) ) {
                // Name fields may expose first/last sub-fields; combine them.
                if ( ! empty( $field['value_raw'] ) && is_array( $field['value_raw'] ) ) {
                    $parts = array_filter( $field['value_raw'] );
                    $value = implode( ' ', $parts );
                }
                $summary['name'] = $value ?: $summary['name'];
            } elseif ( $field['type'] === 'email' || str_contains( $label, 'email' ) ) {
                $summary['email'] = $value;
            } elseif ( str_contains( $label, 'phone' ) || str_contains( $label, 'mobile' ) || str_contains( $label, 'whatsapp' ) ) {
                $summary['phone'] = $value;
            } elseif ( str_contains( $label, 'activity' ) || str_contains( $label, 'sport' ) || str_contains( $label, 'service' ) || str_contains( $label, 'package' ) || str_contains( $label, 'tour' ) ) {
                $summary['activity'] = $value;
            } elseif ( $field['type'] === 'date-time' || str_contains( $label, 'date' ) ) {
                $summary['date'] = $value;
            } elseif ( str_contains( $label, 'guest' ) || str_contains( $label, 'people' ) || str_contains( $label, 'pax' ) || str_contains( $label, 'person' ) ) {
                $summary['guests'] = $value;
            } elseif ( $field['type'] === 'textarea' || str_contains( $label, 'message' ) || str_contains( $label, 'note' ) || str_contains( $label, 'comment' ) ) {
                $summary['message'] = $value;
            } else {
                $summary['extras'][] = $label . ': ' . $value;
            }
        }

        return $summary;
    }

    // -------------------------------------------------------------------------
    // Trello export
    // -------------------------------------------------------------------------

    private static function export_to_trello( string $title, array $summary, array $settings ): ?string {
        $desc_lines = self::summary_to_lines( $summary );
        $desc       = implode( "\n", $desc_lines );

        $url  = 'https://api.trello.com/1/cards';
        $body = [
            'key'    => $settings['trello_api_key'],
            'token'  => $settings['trello_token'],
            'idList' => $settings['trello_list_id'],
            'name'   => $title,
            'desc'   => $desc,
        ];

        if ( ! empty( $settings['trello_label_ids'] ) ) {
            $body['idLabels'] = $settings['trello_label_ids'];
        }
        if ( ! empty( $settings['trello_member_ids'] ) ) {
            $body['idMembers'] = $settings['trello_member_ids'];
        }
        if ( ! empty( $summary['date'] ) ) {
            // Trello due date must be ISO 8601.
            $ts = strtotime( $summary['date'] );
            if ( $ts ) {
                $body['due'] = gmdate( 'Y-m-d\TH:i:s.000\Z', $ts );
            }
        }

        $response = wp_remote_post( $url, [
            'body'    => $body,
            'timeout' => 15,
        ] );

        if ( is_wp_error( $response ) ) {
            return $response->get_error_message();
        }
        $code = wp_remote_retrieve_response_code( $response );
        if ( $code < 200 || $code >= 300 ) {
            return 'HTTP ' . $code . ': ' . wp_remote_retrieve_body( $response );
        }

        return null; // success
    }

    // -------------------------------------------------------------------------
    // Jira export
    // -------------------------------------------------------------------------

    private static function export_to_jira( string $title, array $summary, array $settings ): ?string {
        $base_url    = rtrim( $settings['jira_base_url'], '/' );
        $email       = $settings['jira_email'];
        $token       = $settings['jira_api_token'];
        $project_key = $settings['jira_project_key'];
        $issue_type  = $settings['jira_issue_type'] ?: 'Task';

        $description = self::summary_to_atlassian_doc( $summary );

        $payload = [
            'fields' => [
                'project'     => [ 'key' => $project_key ],
                'summary'     => $title,
                'issuetype'   => [ 'name' => $issue_type ],
                'description' => $description,
            ],
        ];

        $auth_header = 'Basic ' . base64_encode( $email . ':' . $token );

        $response = wp_remote_post( $base_url . '/rest/api/3/issue', [
            'headers' => [
                'Authorization' => $auth_header,
                'Content-Type'  => 'application/json',
                'Accept'        => 'application/json',
            ],
            'body'    => wp_json_encode( $payload ),
            'timeout' => 15,
        ] );

        if ( is_wp_error( $response ) ) {
            return $response->get_error_message();
        }
        $code = wp_remote_retrieve_response_code( $response );
        if ( $code < 200 || $code >= 300 ) {
            return 'HTTP ' . $code . ': ' . wp_remote_retrieve_body( $response );
        }

        return null; // success
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    /** Convert summary to a plain list of non-empty lines. */
    private static function summary_to_lines( array $summary ): array {
        $lines = [];
        if ( $summary['name'] )     $lines[] = 'Name: '     . $summary['name'];
        if ( $summary['email'] )    $lines[] = 'Email: '    . $summary['email'];
        if ( $summary['phone'] )    $lines[] = 'Phone: '    . $summary['phone'];
        if ( $summary['activity'] ) $lines[] = 'Activity: ' . $summary['activity'];
        if ( $summary['date'] )     $lines[] = 'Date: '     . $summary['date'];
        if ( $summary['guests'] )   $lines[] = 'Guests: '   . $summary['guests'];
        if ( $summary['message'] )  $lines[] = 'Message: '  . $summary['message'];
        foreach ( $summary['extras'] as $extra ) {
            $lines[] = ucfirst( $extra );
        }
        return $lines;
    }

    /** Build an Atlassian Document Format (ADF) body for Jira Cloud REST v3. */
    private static function summary_to_atlassian_doc( array $summary ): array {
        $lines = self::summary_to_lines( $summary );
        return [
            'type'    => 'doc',
            'version' => 1,
            'content' => array_map( function ( $text ) {
                return [
                    'type'    => 'paragraph',
                    'content' => [ [ 'type' => 'text', 'text' => $text ] ],
                ];
            }, $lines ),
        ];
    }

    // -------------------------------------------------------------------------
    // Settings
    // -------------------------------------------------------------------------

    private static function get_settings(): array {
        $defaults = [
            'form_ids'          => '',
            'trello_api_key'    => '',
            'trello_token'      => '',
            'trello_list_id'    => '',
            'trello_label_ids'  => '',
            'trello_member_ids' => '',
            'jira_base_url'     => '',
            'jira_email'        => '',
            'jira_api_token'    => '',
            'jira_project_key'  => '',
            'jira_issue_type'   => 'Task',
        ];
        $saved = get_option( self::OPTION_KEY, [] );
        return wp_parse_args( $saved, $defaults );
    }

    public static function register_settings(): void {
        register_setting( self::OPTION_KEY, self::OPTION_KEY, [ 'sanitize_callback' => [ self::class, 'sanitize_settings' ] ] );
    }

    public static function sanitize_settings( $input ): array {
        $clean = [];
        $text_fields = [
            'form_ids', 'trello_api_key', 'trello_token', 'trello_list_id',
            'trello_label_ids', 'trello_member_ids',
            'jira_base_url', 'jira_email', 'jira_api_token', 'jira_project_key', 'jira_issue_type',
        ];
        foreach ( $text_fields as $field ) {
            $clean[ $field ] = sanitize_text_field( $input[ $field ] ?? '' );
        }
        // Basic URL validation for Jira base URL.
        if ( ! empty( $clean['jira_base_url'] ) && ! filter_var( $clean['jira_base_url'], FILTER_VALIDATE_URL ) ) {
            add_settings_error( self::OPTION_KEY, 'invalid_url', 'Jira Base URL must be a valid URL.', 'error' );
            $clean['jira_base_url'] = '';
        }
        return $clean;
    }

    // -------------------------------------------------------------------------
    // Admin UI
    // -------------------------------------------------------------------------

    public static function add_menu(): void {
        add_options_page(
            'Booking Export',
            'Booking Export',
            'manage_options',
            self::MENU_SLUG,
            [ self::class, 'render_settings_page' ]
        );
    }

    public static function admin_notices(): void {
        settings_errors( self::OPTION_KEY );
    }

    public static function render_settings_page(): void {
        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }

        $s = self::get_settings();
        ?>
        <div class="wrap">
            <h1>Booking Export — Jira &amp; Trello</h1>
            <p>On each WPForms submission, this plugin creates a card/issue in the configured destinations.
               Leave credentials blank to disable that destination.</p>

            <form method="post" action="options.php">
                <?php settings_fields( self::OPTION_KEY ); ?>

                <h2>General</h2>
                <table class="form-table" role="presentation">
                    <tr>
                        <th><label for="lbe_form_ids">WPForms Form IDs to watch</label></th>
                        <td>
                            <input id="lbe_form_ids" name="<?php echo esc_attr( self::OPTION_KEY ); ?>[form_ids]"
                                   type="text" class="regular-text"
                                   value="<?php echo esc_attr( $s['form_ids'] ); ?>" />
                            <p class="description">Comma-separated. Leave blank to export <em>all</em> WPForms submissions.</p>
                        </td>
                    </tr>
                </table>

                <h2>Trello</h2>
                <table class="form-table" role="presentation">
                    <?php self::text_row( 'trello_api_key',    'API Key',    $s['trello_api_key'],    'From https://trello.com/app-key' ); ?>
                    <?php self::text_row( 'trello_token',      'Token',      $s['trello_token'],      'Generate at https://trello.com/app-key (click "Token" link)' ); ?>
                    <?php self::text_row( 'trello_list_id',    'List ID',    $s['trello_list_id'],    'Open card → share → the long ID in the URL is the list ID; or use the Trello API to list your lists.' ); ?>
                    <?php self::text_row( 'trello_label_ids',  'Label IDs',  $s['trello_label_ids'],  'Optional. Comma-separated label IDs.' ); ?>
                    <?php self::text_row( 'trello_member_ids', 'Member IDs', $s['trello_member_ids'], 'Optional. Comma-separated member IDs to assign.' ); ?>
                </table>

                <h2>Jira Cloud</h2>
                <table class="form-table" role="presentation">
                    <?php self::text_row( 'jira_base_url',     'Base URL',     $s['jira_base_url'],     'e.g. https://yoursite.atlassian.net' ); ?>
                    <?php self::text_row( 'jira_email',        'Account Email', $s['jira_email'],       'Atlassian account email address' ); ?>
                    <?php self::text_row( 'jira_api_token',    'API Token',    $s['jira_api_token'],    'Generate at https://id.atlassian.com/manage-profile/security/api-tokens' ); ?>
                    <?php self::text_row( 'jira_project_key',  'Project Key',  $s['jira_project_key'],  'e.g. LEM or WAVE' ); ?>
                    <?php self::text_row( 'jira_issue_type',   'Issue Type',   $s['jira_issue_type'],   'e.g. Task, Story, Bug (must match your project)' ); ?>
                </table>

                <?php submit_button( 'Save Settings' ); ?>
            </form>
        </div>
        <?php
    }

    /** Helper: render a single table row with a text input. */
    private static function text_row( string $key, string $label, string $value, string $desc = '' ): void {
        $id   = 'lbe_' . $key;
        $name = self::OPTION_KEY . '[' . $key . ']';
        echo '<tr>';
        echo '<th><label for="' . esc_attr( $id ) . '">' . esc_html( $label ) . '</label></th>';
        echo '<td>';
        echo '<input id="' . esc_attr( $id ) . '" name="' . esc_attr( $name ) . '" type="text" class="regular-text" value="' . esc_attr( $value ) . '" />';
        if ( $desc ) {
            echo '<p class="description">' . wp_kses_post( $desc ) . '</p>';
        }
        echo '</td></tr>';
    }
}

add_action( 'plugins_loaded', [ 'LBE_Booking_Export', 'init' ] );
