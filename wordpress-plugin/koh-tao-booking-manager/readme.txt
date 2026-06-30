=== Koh Tao Booking Manager ===
Contributors: onemediaasia
Tags: bookings, rest-api, admin
Requires at least: 6.0
Tested up to: 6.5
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Stores Koh Tao dive bookings inside WordPress and exposes the REST endpoints consumed by the frontend booking flow.

== Description ==

This plugin creates two database tables:

* `wp_ktd_bookings` for bookings
* `wp_ktd_crm_intake` for CRM sync events

It exposes these REST routes under `/wp-json/ktd/v1`:

* `GET /bookings`
* `POST /bookings`
* `POST /bookings/create`
* `POST /booking`
* `GET /bookings/{id}`
* `PATCH /bookings/{id}`
* `DELETE /bookings/{id}`
* `POST /crm-intake`

Configure the API key in `Settings > KTD Booking Manager` after activation.

== Installation ==

1. Upload the plugin zip through WordPress Admin.
2. Activate the plugin.
3. Open `Settings > KTD Booking Manager`.
4. Set the same API key used by your frontend and API server.
5. Point your app to `/wp-json/ktd/v1` on this site.

== Changelog ==

= 1.0.0 =
* Initial plugin scaffold with bookings CRUD, CRM intake logging, and API key settings.