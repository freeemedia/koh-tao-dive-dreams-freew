<?php
/**
 * Template Name: KTD Dashboard Home (Email Invoice)

 * MARKER: Email invoice template clone of working dashboard
 *
 * Drop this file into your active WordPress theme folder, then:
 *   1. Create a new Page in WP Admin → "Dashboard" (or "Home")
 *   2. Set the Page Template to "KTD Dashboard Home (Email Invoice)"
 *   3. Optionally set it as your front page under Settings → Reading
 *
 * Requires: Koh Tao Booking Manager plugin (provides wp-json/ktd/v1/ endpoints)
 */

// Redirect non-admins to login
if ( ! is_user_logged_in() ) {
    auth_redirect();
}
if ( ! current_user_can( 'manage_options' ) ) {
    wp_die( __( 'You do not have permission to view this page.' ) );
}

// No WP header/footer — full-screen dashboard
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>KTD Dashboard — <?php bloginfo( 'name' ); ?></title>
  <?php wp_head(); ?>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:       #0f1117;
      --surface:  #1a1d27;
      --surface2: #21253a;
      --border:   #2d3248;
      --text:     #e2e8f0;
      --muted:    #8892a4;
      --accent:   #6366f1;
      --accent2:  #818cf8;
      --green:    #10b981;
      --yellow:   #f59e0b;
      --red:      #ef4444;
      --blue:     #3b82f6;
      --sidebar-w: 240px;
    }

    body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; }

    /* ── Layout ── */
    #ktd-shell { display: flex; min-height: 100vh; }

    /* ── Sidebar ── */
    #ktd-sidebar {
      width: var(--sidebar-w);
      background: var(--surface);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0; left: 0; bottom: 0;
      z-index: 100;
      overflow-y: auto;
    }
    .sidebar-logo {
      padding: 20px 20px 16px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .sidebar-logo img { width: 32px; height: 32px; border-radius: 6px; }
    .sidebar-logo span { font-weight: 700; font-size: 15px; color: var(--text); letter-spacing: -0.2px; }

    .sidebar-section-label {
      padding: 20px 20px 6px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
    }
    .sidebar-nav { list-style: none; padding: 0 8px; }
    .sidebar-nav li a {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 12px;
      border-radius: 7px;
      color: var(--muted);
      text-decoration: none;
      font-size: 13.5px;
      font-weight: 500;
      transition: background 0.15s, color 0.15s;
    }
    .sidebar-nav li a:hover { background: var(--surface2); color: var(--text); }
    .sidebar-nav li a.active { background: var(--accent); color: #fff; }
    .sidebar-nav li a .nav-icon { font-size: 16px; width: 20px; text-align: center; }

    .sidebar-footer {
      margin-top: auto;
      padding: 16px 20px;
      border-top: 1px solid var(--border);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .sidebar-footer .avatar {
      width: 32px; height: 32px; border-radius: 50%;
      background: var(--accent);
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 13px; color: #fff; flex-shrink: 0;
    }
    .sidebar-footer .user-info { flex: 1; overflow: hidden; }
    .sidebar-footer .user-name { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sidebar-footer .user-role { font-size: 11px; color: var(--muted); }
    .sidebar-footer a.logout { font-size: 18px; color: var(--muted); text-decoration: none; transition: color 0.15s; }
    .sidebar-footer a.logout:hover { color: var(--red); }

    /* ── Main area ── */
    #ktd-main {
      margin-left: var(--sidebar-w);
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    /* ── Topbar ── */
    #ktd-topbar {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 0 28px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .topbar-left h1 { font-size: 18px; font-weight: 700; }
    .topbar-left .breadcrumb { font-size: 12px; color: var(--muted); margin-top: 1px; }
    .topbar-right { display: flex; align-items: center; gap: 12px; }
    .topbar-badge {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 5px 12px;
      font-size: 12px;
      color: var(--muted);
    }
    .topbar-badge strong { color: var(--text); }
    .btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 7px 16px;
      border-radius: 7px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      border: none;
      transition: opacity 0.15s;
    }
    .btn:hover { opacity: 0.85; }
    .btn-primary { background: var(--accent); color: #fff; }
    .btn-ghost { background: transparent; border: 1px solid var(--border); color: var(--text); }

    /* ── Content ── */
    #ktd-content { padding: 28px; flex: 1; }

    /* ── Stat cards ── */
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-bottom: 28px; }
    .stat-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      position: relative;
      overflow: hidden;
    }
    .stat-card::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 3px;
    }
    .stat-card.c-blue::before { background: var(--blue); }
    .stat-card.c-green::before { background: var(--green); }
    .stat-card.c-yellow::before { background: var(--yellow); }
    .stat-card.c-red::before { background: var(--red); }
    .stat-card.c-purple::before { background: var(--accent); }

    .stat-label { font-size: 12px; color: var(--muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
    .stat-value { font-size: 28px; font-weight: 800; color: var(--text); line-height: 1; }
    .stat-sub { font-size: 12px; color: var(--muted); }
    .stat-icon { position: absolute; right: 16px; top: 20px; font-size: 24px; opacity: 0.25; }

    /* ── Grid ── */
    .content-grid { display: grid; grid-template-columns: 1fr 340px; gap: 20px; }
    @media (max-width: 1100px) { .content-grid { grid-template-columns: 1fr; } }

    /* ── Panel ── */
    .panel {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
    }
    .panel-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .panel-header h2 { font-size: 14px; font-weight: 700; }
    .panel-header .header-actions { display: flex; gap: 8px; align-items: center; }
    .panel-body { padding: 0; }

    /* ── Table ── */
    .ktd-table { width: 100%; border-collapse: collapse; }
    .ktd-table thead th {
      padding: 10px 16px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--muted);
      border-bottom: 1px solid var(--border);
      text-align: left;
      background: var(--surface2);
    }
    .ktd-table tbody tr { border-bottom: 1px solid var(--border); transition: background 0.1s; }
    .ktd-table tbody tr:last-child { border-bottom: none; }
    .ktd-table tbody tr:hover { background: var(--surface2); }
    .ktd-table td { padding: 12px 16px; font-size: 13px; vertical-align: middle; }

    /* Status badges */
    .badge {
      display: inline-block;
      padding: 2px 9px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 700;
      text-transform: capitalize;
    }
    .badge-new      { background: rgba(99,102,241,.18); color: var(--accent2); }
    .badge-pending  { background: rgba(245,158,11,.18); color: var(--yellow); }
    .badge-confirmed{ background: rgba(16,185,129,.18); color: var(--green); }
    .badge-cancelled{ background: rgba(239,68,68,.18);  color: var(--red); }
    .badge-completed{ background: rgba(59,130,246,.18); color: var(--blue); }
    /* Payment status badges */
    .pay-badge { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .pay-unpaid   { background: rgba(239,68,68,.15);   color: var(--red); }
    .pay-invoiced { background: rgba(245,158,11,.15);  color: var(--yellow); }
    .pay-paid     { background: rgba(16,185,129,.15);  color: var(--green); }
    /* Invoice modal */
    .ktd-modal-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,.6); z-index:1000; align-items:center; justify-content:center; }
    .ktd-modal-overlay.open { display:flex; }
    .ktd-modal { background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:28px; width:420px; max-width:95vw; }
    .ktd-modal h3 { font-size:16px; font-weight:700; margin-bottom:16px; }
    .ktd-modal label { display:block; font-size:12px; color:var(--muted); margin-bottom:4px; font-weight:600; }
    .ktd-modal input, .ktd-modal textarea { width:100%; background:var(--bg); border:1px solid var(--border); color:var(--text); border-radius:6px; padding:8px 12px; font-size:13px; margin-bottom:14px; outline:none; }
    .ktd-modal input:focus, .ktd-modal textarea:focus { border-color:var(--accent); }
    .ktd-modal .modal-actions { display:flex; gap:10px; margin-top:4px; }
    .ktd-modal .modal-actions button { flex:1; }
    .ktd-modal .modal-note { font-size:11px; color:var(--muted); margin-bottom:14px; line-height:1.5; }
    .invoice-btn { background:var(--surface2); border:1px solid var(--border); color:var(--text); border-radius:5px; padding:3px 8px; font-size:11px; cursor:pointer; transition:border-color .15s; white-space:nowrap; }
    .invoice-btn:hover { border-color:var(--accent); color:var(--accent); }

    /* ── Quick actions ── */
    .quick-actions { display: flex; flex-direction: column; gap: 8px; padding: 16px; }
    .action-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 8px;
      text-decoration: none;
      color: var(--text);
      font-size: 13px;
      font-weight: 500;
      transition: border-color 0.15s, background 0.15s;
    }
    .action-item:hover { border-color: var(--accent); background: rgba(99,102,241,.08); color: var(--text); }
    .action-item .action-icon { font-size: 18px; width: 28px; text-align: center; }
    .action-item .action-label { flex: 1; }
    .action-item .action-arrow { color: var(--muted); font-size: 16px; }

    /* ── Activity feed ── */
    .activity-list { list-style: none; padding: 0; }
    .activity-list li {
      display: flex;
      gap: 12px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      font-size: 13px;
    }
    .activity-list li:last-child { border-bottom: none; }
    .activity-dot {
      width: 8px; height: 8px; border-radius: 50%;
      margin-top: 5px; flex-shrink: 0;
    }
    .activity-content { flex: 1; }
    .activity-name { font-weight: 600; }
    .activity-detail { color: var(--muted); font-size: 12px; margin-top: 2px; }
    .activity-time { font-size: 11px; color: var(--muted); white-space: nowrap; margin-left: auto; }

    /* ── Loading ── */
    .loading { text-align: center; padding: 40px; color: var(--muted); font-size: 13px; }
    .loading .spinner {
      width: 24px; height: 24px; border: 2px solid var(--border);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      margin: 0 auto 12px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── Search & filter bar ── */
    .filter-bar {
      display: flex;
      gap: 10px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      align-items: center;
      background: var(--surface2);
      flex-wrap: wrap;
    }
    .filter-bar input, .filter-bar select {
      background: var(--bg);
      border: 1px solid var(--border);
      color: var(--text);
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 12px;
      outline: none;
      transition: border-color 0.15s;
    }
    .filter-bar input { flex: 1; min-width: 160px; }
    .filter-bar input:focus, .filter-bar select:focus { border-color: var(--accent); }
    .filter-bar select option { background: var(--surface); }

    /* ── Empty state ── */
    .empty-state { text-align: center; padding: 48px 20px; color: var(--muted); }
    .empty-state .empty-icon { font-size: 40px; margin-bottom: 12px; }
    .empty-state p { font-size: 13px; }
  </style>
</head>
<body>

<?php
$current_user = wp_get_current_user();
$user_initials = strtoupper( substr( $current_user->display_name, 0, 1 ) );
$logout_url = wp_logout_url( home_url() );
$wp_admin_url = admin_url();
$wp_new_post_url = admin_url( 'post-new.php' );
$site_name = get_bloginfo( 'name' );
$logo_url = get_site_icon_url( 64 );
?>

<div id="ktd-shell">

  <!-- ── Sidebar ── -->
  <aside id="ktd-sidebar">
    <div class="sidebar-logo">
      <?php if ( $logo_url ) : ?>
        <img src="<?php echo esc_url( $logo_url ); ?>" alt="Logo">
      <?php else : ?>
        <div style="width:32px;height:32px;border-radius:6px;background:var(--accent);display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;">K</div>
      <?php endif; ?>
      <span>KTD CRM</span>
    </div>

    <p class="sidebar-section-label">Main</p>
    <ul class="sidebar-nav">
      <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="active">
        <span class="nav-icon">🏠</span> Dashboard
      </a></li>
      <li><a href="#bookings-section" onclick="document.getElementById('bookings-section').scrollIntoView({behavior:'smooth'});return false;">
        <span class="nav-icon">📋</span> Bookings
      </a></li>
      <li><a href="<?php echo esc_url( $wp_admin_url . 'admin.php?page=ktd-bookings' ); ?>">
        <span class="nav-icon">⚙️</span> Full Admin View
      </a></li>
    </ul>

    <p class="sidebar-section-label">WordPress</p>
    <ul class="sidebar-nav">
      <li><a href="<?php echo esc_url( $wp_admin_url . 'edit.php' ); ?>">
        <span class="nav-icon">📝</span> Posts
      </a></li>
      <li><a href="<?php echo esc_url( $wp_admin_url . 'edit.php?post_type=page' ); ?>">
        <span class="nav-icon">📄</span> Pages
      </a></li>
      <li><a href="<?php echo esc_url( $wp_admin_url . 'users.php' ); ?>">
        <span class="nav-icon">👥</span> Users
      </a></li>
      <li><a href="<?php echo esc_url( $wp_admin_url . 'options-general.php' ); ?>">
        <span class="nav-icon">🔧</span> Settings
      </a></li>
    </ul>

    <p class="sidebar-section-label">Quick Links</p>
    <ul class="sidebar-nav">
      <li><a href="https://www.divinginasia.com" target="_blank">
        <span class="nav-icon">🌐</span> Live Site ↗
      </a></li>
      <li><a href="https://www.divinginasia.com/booking" target="_blank">
        <span class="nav-icon">📅</span> Booking Page ↗
      </a></li>
    </ul>

    <div class="sidebar-footer">
      <div class="avatar"><?php echo esc_html( $user_initials ); ?></div>
      <div class="user-info">
        <div class="user-name"><?php echo esc_html( $current_user->display_name ); ?></div>
        <div class="user-role">Administrator</div>
      </div>
      <a href="<?php echo esc_url( $logout_url ); ?>" class="logout" title="Log out">⏻</a>
    </div>
  </aside>

  <!-- ── Main ── -->
  <div id="ktd-main">

    <!-- Topbar -->
    <header id="ktd-topbar">
      <div class="topbar-left">
        <h1>Dashboard</h1>
        <div class="breadcrumb">KTD CRM &rsaquo; Overview</div>
      </div>
      <div class="topbar-right">
        <div class="topbar-badge">
          <strong id="topbar-date"></strong>
        </div>
        <a href="<?php echo esc_url( $wp_admin_url . 'admin.php?page=ktd-bookings' ); ?>" class="btn btn-primary">
          + New Booking
        </a>
        <a href="<?php echo esc_url( $wp_admin_url ); ?>" class="btn btn-ghost">WP Admin</a>
      </div>
    </header>

    <!-- Content -->
    <main id="ktd-content">

      <!-- Stat cards -->
      <div class="stats-grid" id="stats-grid">
        <div class="stat-card c-blue">
          <div class="stat-icon">📋</div>
          <div class="stat-label">Total Bookings</div>
          <div class="stat-value" id="stat-total">—</div>
          <div class="stat-sub">All time</div>
        </div>
        <div class="stat-card c-yellow">
          <div class="stat-icon">⏳</div>
          <div class="stat-label">New / Pending</div>
          <div class="stat-value" id="stat-pending">—</div>
          <div class="stat-sub">Needs attention</div>
        </div>
        <div class="stat-card c-green">
          <div class="stat-icon">✅</div>
          <div class="stat-label">Confirmed</div>
          <div class="stat-value" id="stat-confirmed">—</div>
          <div class="stat-sub">Locked in</div>
        </div>
        <div class="stat-card c-purple">
          <div class="stat-icon">💰</div>
          <div class="stat-label">Deposits Received</div>
          <div class="stat-value" id="stat-deposits">—</div>
          <div class="stat-sub">THB deposited</div>
        </div>
        <div class="stat-card c-red">
          <div class="stat-icon">❌</div>
          <div class="stat-label">Cancelled</div>
          <div class="stat-value" id="stat-cancelled">—</div>
          <div class="stat-sub">All time</div>
        </div>
      </div>

      <!-- Two-col grid -->
      <div class="content-grid">

        <!-- Bookings table -->
        <div>
          <div class="panel" id="bookings-section">
            <div class="panel-header">
              <h2>Recent Bookings</h2>
              <div class="header-actions">
                <span id="booking-count-label" style="font-size:12px;color:var(--muted);"></span>
                <a href="<?php echo esc_url( $wp_admin_url . 'admin.php?page=ktd-bookings' ); ?>" class="btn btn-ghost" style="padding:5px 12px;font-size:12px;">View All</a>
              </div>
            </div>

            <!-- Filter bar -->
            <div class="filter-bar">
              <input type="text" id="search-input" placeholder="Search name, email, course…">
              <select id="status-filter">
                <option value="">All statuses</option>
                <option value="new">New</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select id="type-filter">
                <option value="">All types</option>
                <option value="course">Course</option>
                <option value="dive">Dive</option>
                <option value="accommodation">Accommodation</option>
              </select>
            </div>

            <div class="panel-body">
              <div id="bookings-loading" class="loading">
                <div class="spinner"></div>
                Loading bookings…
              </div>
              <div id="bookings-table-wrap" style="display:none;overflow-x:auto;">
                <table class="ktd-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name / Email</th>
                      <th>Course / Activity</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Payment</th>
                      <th>Deposit</th>
                      <th>Total</th>
                      <th>Source</th>
                      <th>Invoice</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody id="bookings-tbody"></tbody>
                </table>
              </div>
              <div id="bookings-empty" class="empty-state" style="display:none;">
                <div class="empty-icon">📭</div>
                <p>No bookings match your filters.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right column -->
        <div style="display:flex;flex-direction:column;gap:20px;">

          <!-- Quick actions -->
          <div class="panel">
            <div class="panel-header"><h2>Quick Actions</h2></div>
            <div class="quick-actions">
              <a href="https://www.divinginasia.com/booking" target="_blank" class="action-item">
                <span class="action-icon">📅</span>
                <span class="action-label">Open Booking Form</span>
                <span class="action-arrow">›</span>
              </a>
              <a href="<?php echo esc_url( $wp_admin_url . 'admin.php?page=ktd-bookings' ); ?>" class="action-item">
                <span class="action-icon">📋</span>
                <span class="action-label">Manage All Bookings</span>
                <span class="action-arrow">›</span>
              </a>
              <a href="https://www.divinginasia.com" target="_blank" class="action-item">
                <span class="action-icon">🌐</span>
                <span class="action-label">View Live Website</span>
                <span class="action-arrow">›</span>
              </a>
              <a href="https://wa.me/66639230132" target="_blank" class="action-item">
                <span class="action-icon">💬</span>
                <span class="action-label">WhatsApp Support Line</span>
                <span class="action-arrow">›</span>
              </a>
              <a href="https://dashboard.stripe.com" target="_blank" class="action-item">
                <span class="action-icon">💳</span>
                <span class="action-label">Stripe Dashboard</span>
                <span class="action-arrow">›</span>
              </a>
              <a href="https://paypal.com" target="_blank" class="action-item">
                <span class="action-icon">🅿️</span>
                <span class="action-label">PayPal Dashboard</span>
                <span class="action-arrow">›</span>
              </a>
            </div>
          </div>

          <!-- Recent activity -->
          <div class="panel">
            <div class="panel-header"><h2>Recent Activity</h2></div>
            <div class="panel-body">
              <div id="activity-loading" class="loading">
                <div class="spinner"></div>
                Loading…
              </div>
              <ul class="activity-list" id="activity-list" style="display:none;"></ul>
              <div id="activity-empty" class="empty-state" style="display:none;">
                <div class="empty-icon">🔔</div>
                <p>No recent activity.</p>
              </div>
            </div>
          </div>

        </div>
      </div><!-- /content-grid -->

    </main>
  </div><!-- /ktd-main -->
</div><!-- /ktd-shell -->

<script>
(function () {
  'use strict';

  // ── Date in topbar ─────────────────────────────────────────────
  const dateEl = document.getElementById('topbar-date');
  if (dateEl) {
    const d = new Date();
    dateEl.textContent = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  }

  // ── REST API helpers ────────────────────────────────────────────
  const REST_BASE = '<?php echo esc_js( get_rest_url( null, 'ktd/v1' ) ); ?>';
  const NONCE    = '<?php echo esc_js( wp_create_nonce( 'wp_rest' ) ); ?>';
  const API_KEY  = '<?php echo esc_js( get_option( 'ktd_booking_api_key', '' ) ); ?>';
  const API_KEY_FALLBACK = '<?php echo esc_js( defined("KTD_API_KEY") ? KTD_API_KEY : "909010232893284934783734" ); ?>';

  function buildApiUrl(path) {
    const separator = path.includes('?') ? '&' : '?';
    return REST_BASE + path + separator + '_=' + Date.now();
  }

  async function apiFetch(path, options = {}) {
    const headers = Object.assign(
      { 'X-WP-Nonce': NONCE },
      API_KEY ? { 'x-ktd-api-key': API_KEY } : {},
      options.headers || {}
    );
    const res = await fetch(buildApiUrl(path), Object.assign({}, options, { headers, cache: 'no-store', credentials: 'same-origin' }));
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }

  async function fetchBookings() {
    try {
      return await apiFetch('/bookings?per_page=200&orderby=created_at&order=desc');
    } catch (primaryError) {
      try {
        return await apiFetch('/bookings');
      } catch (secondaryError) {
        const fallbackHeaders = {
          'Content-Type': 'application/json',
          'x-ktd-api-key': API_KEY || API_KEY_FALLBACK,
        };
        const fallbackRes = await fetch(buildApiUrl('/bookings'), {
          method: 'GET',
          headers: fallbackHeaders,
          cache: 'no-store',
          credentials: 'same-origin',
        });
        if (!fallbackRes.ok) {
          throw new Error('Bookings API failed: ' + fallbackRes.status + ' (' + primaryError.message + ' / ' + secondaryError.message + ')');
        }
        return fallbackRes.json();
      }
    }
  }

  async function patchBooking(id, fields) {
    const res = await fetch(REST_BASE + '/bookings/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': NONCE, ...(API_KEY ? { 'x-ktd-api-key': API_KEY } : {}) },
      body: JSON.stringify(fields),
    });
    if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e.message || 'HTTP ' + res.status); }
    return res.json();
  }

  // ── Load bookings ───────────────────────────────────────────────
  let allBookings = [];
  let filtersBound = false;
  let dashboardRefreshTimer = null;
  let dashboardLoading = false;

  function statusBadge(status) {
    const s = (status || 'new').toLowerCase().replace(/[^a-z]/g, '');
    const map = { new: 'badge-new', pending: 'badge-pending', confirmed: 'badge-confirmed', cancelled: 'badge-cancelled', completed: 'badge-completed' };
    return `<span class="badge ${map[s] || 'badge-new'}">${s}</span>`;
  }

  function fmtCurrency(val) {
    const n = parseFloat(val);
    if (!n || isNaN(n)) return '—';
    return '฿' + n.toLocaleString('en', { maximumFractionDigits: 0 });
  }

  function fmtDate(str) {
    if (!str) return '—';
    try {
      return new Date(str).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return str; }
  }

  function timeAgo(str) {
    if (!str) return '';
    const diff = (Date.now() - new Date(str).getTime()) / 1000;
    if (diff < 60)   return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
  }

  function renderTable(bookings) {
    const tbody = document.getElementById('bookings-tbody');
    const wrap  = document.getElementById('bookings-table-wrap');
    const empty = document.getElementById('bookings-empty');
    const label = document.getElementById('booking-count-label');

    if (label) label.textContent = bookings.length + ' result' + (bookings.length !== 1 ? 's' : '');

    if (!bookings.length) {
      wrap.style.display  = 'none';
      empty.style.display = 'block';
      return;
    }

    wrap.style.display  = 'block';
    empty.style.display = 'none';

    tbody.innerHTML = bookings.slice(0, 50).map(b => `
      <tr data-id="${b.id}">
        <td style="color:var(--muted);font-size:11px;">#${b.id}</td>
        <td>
          <input class="ktd-edit" data-id="${b.id}" data-field="name" value="${escHtml(b.name||'')}"
            style="font-weight:600;width:120px;" placeholder="Name" />
          <input class="ktd-edit" data-id="${b.id}" data-field="email" value="${escHtml(b.email||'')}"
            style="font-size:11px;color:var(--muted);width:140px;margin-top:3px;" placeholder="Email" />
          <input class="ktd-edit" data-id="${b.id}" data-field="phone" value="${escHtml(b.phone||'')}"
            style="font-size:11px;color:var(--muted);width:110px;margin-top:3px;" placeholder="Phone" />
        </td>
        <td>
          <input class="ktd-edit" data-id="${b.id}" data-field="item_title" value="${escHtml(b.item_title||b.booking_type||'')}"
            style="width:150px;" placeholder="Course / Activity" />
        </td>
        <td>
          <input class="ktd-edit" data-id="${b.id}" data-field="preferred_date" value="${escHtml(b.preferred_date||'')}"
            style="width:110px;" placeholder="YYYY-MM-DD" />
        </td>
        <td>
          <select class="ktd-status-select" data-id="${b.id}"
            style="background:var(--surface2);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:3px 8px;font-size:12px;cursor:pointer;">
            ${['new','pending','confirmed','cancelled','completed'].map(s =>
              `<option value="${s}"${(b.status||'new')===s?' selected':''}>${s}</option>`
            ).join('')}
          </select>
        </td>
        <td>
          <input class="ktd-edit" data-id="${b.id}" data-field="deposit_amount" value="${b.deposit_amount||''}"
            style="width:80px;" placeholder="0" />
        </td>
        <td>
          <input class="ktd-edit" data-id="${b.id}" data-field="total_amount" value="${b.total_amount||''}"
            style="width:80px;" placeholder="0" />
        </td>
        <td>
          ${payBadge(b.payment_status)}
        </td>
        <td>
          <input class="ktd-edit" data-id="${b.id}" data-field="deposit_amount" value="${b.deposit_amount||''}"
            style="width:80px;" placeholder="0" />
        </td>
        <td>
          <input class="ktd-edit" data-id="${b.id}" data-field="total_amount" value="${b.total_amount||''}"
            style="width:80px;" placeholder="0" />
        </td>
        <td style="font-size:11px;color:var(--muted);">${escHtml(b.booking_source || '—')}</td>
        <td>
          <button class="invoice-btn" data-id="${b.id}" data-name="${escHtml(b.name||'')}" data-email="${escHtml(b.email||'')}"
            data-total="${b.total_amount||''}" data-deposit="${b.deposit_amount||''}" data-title="${escHtml(b.item_title||b.booking_type||'')}"
            title="Open invoice email draft">💳 Invoice</button>
          <button class="invoice-btn paypal-inv-btn" data-id="${b.id}" data-name="${escHtml(b.name||'')}" data-email="${escHtml(b.email||'')}"
            data-deposit="${b.deposit_amount||''}" data-title="${escHtml(b.item_title||b.booking_type||'')}"
            title="Send PayPal payment link" style="margin-top:4px;">🅿 PayPal</button>
          ${b.payment_link_url ? `<a href="${escHtml(b.payment_link_url)}" target="_blank" style="font-size:10px;color:var(--accent);display:block;margin-top:4px;">🔗 link</a>` : ''}
        </td>
        <td style="min-width:160px;">
          <textarea class="ktd-notes-input" data-id="${b.id}" rows="2"
            style="width:100%;background:var(--surface2);color:var(--text);border:1px solid var(--border);border-radius:6px;padding:4px 8px;font-size:11px;resize:none;"
            placeholder="Add notes…">${escHtml(b.internal_notes || b.message || '')}</textarea>
        </td>
      </tr>
    `).join('');

    // Generic text/number field blur → save
    tbody.querySelectorAll('.ktd-edit').forEach(inp => {
      inp.style.cssText += 'background:transparent;border:1px solid transparent;border-radius:4px;color:inherit;padding:2px 4px;display:block;';
      inp.addEventListener('focus', function() { this.style.borderColor = 'var(--accent)'; this.style.background = 'var(--surface2)'; });
      inp.addEventListener('blur', async function() {
        this.style.borderColor = 'transparent';
        this.style.background = 'transparent';
        const id    = this.dataset.id;
        const field = this.dataset.field;
        const val   = this.value;
        const bk    = allBookings.find(b => String(b.id) === String(id));
        if (bk && String(bk[field]||'') === val) return;
        try {
          await patchBooking(id, { [field]: val });
          if (bk) bk[field] = val;
        } catch(e) {
          alert('Save failed: ' + e.message);
        }
      });
    });

    // Status dropdown
    tbody.querySelectorAll('.ktd-status-select').forEach(sel => {
      sel.addEventListener('change', async function() {
        const id = this.dataset.id;
        const status = this.value;
        this.disabled = true;
        try {
          await patchBooking(id, { status });
          const bk = allBookings.find(b => String(b.id) === String(id));
          if (bk) bk.status = status;
        } catch(e) {
          alert('Failed to update status: ' + e.message);
        } finally {
          this.disabled = false;
        }
      });
    });

    // Notes textarea
    tbody.querySelectorAll('.ktd-notes-input').forEach(ta => {
      ta.addEventListener('blur', async function() {
        const id    = this.dataset.id;
        const notes = this.value;
        const bk    = allBookings.find(b => String(b.id) === String(id));
        if (bk && (bk.internal_notes || '') === notes) return;
        try {
          await patchBooking(id, { internal_notes: notes });
          if (bk) bk.internal_notes = notes;
        } catch(e) {
          alert('Failed to save notes: ' + e.message);
        }
      });
    });

    // Invoice button → open email invoice modal
    tbody.querySelectorAll('.invoice-btn:not(.paypal-inv-btn)').forEach(btn => {
      btn.addEventListener('click', function() {
        const modal = document.getElementById('invoice-modal');
        modal.dataset.bookingId    = this.dataset.id;
        modal.dataset.customerEmail = this.dataset.email;
        modal.dataset.customerName  = this.dataset.name;
        document.getElementById('inv-name').value  = this.dataset.name  || '';
        document.getElementById('inv-email').value = this.dataset.email || '';
        const tot = parseFloat(this.dataset.total);
        document.getElementById('inv-amount').value = !isNaN(tot) && tot > 0
          ? Math.round(tot)
          : '';
        document.getElementById('inv-desc').value = `Diving in Asia — Booking #${this.dataset.id}`;
        document.getElementById('inv-result').style.display = 'none';
        document.getElementById('invoice-modal').classList.add('open');
      });
    });
  }

  // Close modal on overlay click
  document.addEventListener('click', function(e) {
    if (e.target.id === 'invoice-modal') {
      document.getElementById('invoice-modal').classList.remove('open');
    }
    if (e.target.id === 'paypal-invoice-modal') {
      document.getElementById('paypal-invoice-modal').classList.remove('open');
    }
  });

  // PayPal invoice button → open modal
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.paypal-inv-btn');
    if (!btn) return;
    const modal = document.getElementById('paypal-invoice-modal');
    modal.dataset.bookingId = btn.dataset.id;
    document.getElementById('pp-name').value  = btn.dataset.name  || '';
    document.getElementById('pp-email').value = btn.dataset.email || '';
    document.getElementById('pp-amount').value = btn.dataset.deposit ? Math.round(parseFloat(btn.dataset.deposit)) : '';
    document.getElementById('pp-desc').value  = btn.dataset.title ? `Diving in Asia — ${btn.dataset.title}` : 'Diving in Asia — Booking Deposit';
    document.getElementById('pp-result').style.display = 'none';
    modal.classList.add('open');
  });

  function openMailClient(mailtoUrl) {
    try {
      const popup = window.open(mailtoUrl, '_blank');
      if (popup) return true;
    } catch (e) {}

    try {
      window.location.href = mailtoUrl;
      return true;
    } catch (e) {}

    try {
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (e) {}

    return false;
  }

  // Send PayPal invoice
  async function handlePaypalInvoiceSend(buttonEl) {
    const modal      = document.getElementById('paypal-invoice-modal');
    const booking_id = modal.dataset.bookingId;
    const email      = document.getElementById('pp-email').value.trim();
    const name       = document.getElementById('pp-name').value.trim();
    const amountTHB  = parseFloat(document.getElementById('pp-amount').value);
    const description = document.getElementById('pp-desc').value.trim();
    const resultEl   = document.getElementById('pp-result');

    if (!email || isNaN(amountTHB) || amountTHB <= 0) {
      resultEl.style.display = 'block';
      resultEl.style.color   = 'var(--red)';
      resultEl.textContent   = 'Please fill in email and a valid THB amount.';
      return;
    }

    const paypalUrl = `https://paypal.me/prodivingasia/${amountTHB}THB`;

    // Update local booking cache
    const bk = allBookings.find(b => String(b.id) === String(booking_id));
    if (bk) { bk.payment_status = 'invoiced'; bk.payment_link_url = paypalUrl; }

    // PATCH booking in WordPress
    try {
      await fetch('<?php echo esc_js(get_site_url()); ?>/wp-json/ktd/v1/bookings/' + booking_id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-ktd-api-key': '<?php echo esc_js(defined("KTD_API_KEY") ? KTD_API_KEY : "909010232893284934783734"); ?>' },
        body: JSON.stringify({ payment_status: 'invoiced', payment_link_url: paypalUrl }),
      });
    } catch(e) { /* non-fatal */ }

    // Open mailto pre-filled
    const subject = encodeURIComponent(description);
    const body    = encodeURIComponent(
      `Hi ${name},\n\nThank you for booking with Diving in Asia!\n\nPlease complete your deposit payment of ฿${amountTHB.toLocaleString()} THB using the secure PayPal link below:\n\n${paypalUrl}\n\nIf you have any questions, feel free to reply to this email.\n\nSee you underwater!\nThe Diving in Asia Team`
    );
    const opened = openMailClient(`mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`);

    resultEl.style.display = 'block';
    resultEl.style.color   = opened ? 'var(--green)' : 'var(--yellow)';
    resultEl.innerHTML     = opened
      ? `✅ PayPal link ready! <a href="${paypalUrl}" target="_blank" style="color:var(--accent);">Open link</a><br><small style="color:var(--muted)">Email draft opened. Paste the link if needed.</small>`
      : `⚠ PayPal link ready! <a href="${paypalUrl}" target="_blank" style="color:var(--accent);">Open link</a><br><small style="color:var(--muted)">Email app did not auto-open. Copy the email address and send manually.</small>`;

    applyFilters();
  }

  // Send invoice email draft
  async function handleMollieInvoiceSend(buttonEl) {
    const modal      = document.getElementById('invoice-modal');
    const booking_id = modal.dataset.bookingId;
    const email      = document.getElementById('inv-email').value.trim();
    const name       = document.getElementById('inv-name').value.trim();
    const amount_thb = parseFloat(document.getElementById('inv-amount').value);
    const description = document.getElementById('inv-desc').value.trim();
    const resultEl   = document.getElementById('inv-result');

    if (!email || isNaN(amount_thb) || amount_thb <= 0) {
      resultEl.style.display = 'block';
      resultEl.style.color   = 'var(--red)';
      resultEl.textContent   = 'Please fill in email and a valid THB amount.';
      return;
    }

    buttonEl.disabled    = true;
    buttonEl.textContent = 'Sending…';

    try {
      await fetch('<?php echo esc_js(get_site_url()); ?>/wp-json/ktd/v1/bookings/' + booking_id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-ktd-api-key': '<?php echo esc_js(defined("KTD_API_KEY") ? KTD_API_KEY : "909010232893284934783734"); ?>',
        },
        body: JSON.stringify({ payment_status: 'invoiced' }),
      });

      // Update local booking cache
      const bk = allBookings.find(b => String(b.id) === String(booking_id));
      if (bk) { bk.payment_status = 'invoiced'; }

      // Open mailto with invoice details
      const subject = encodeURIComponent(description);
      const body    = encodeURIComponent(
        `Hi ${name},\n\nThank you for booking with Diving in Asia!\n\nPlease find your invoice details below:\n\nBooking: ${description}\nAmount Due: ฿${Math.round(amount_thb).toLocaleString()} THB\n\nIf you would like to pay online, please let us know and we can send you a PayPal payment link.\n\nIf you have any questions, feel free to reply to this email.\n\nSee you underwater!\nThe Diving in Asia Team`
      );
      const opened = openMailClient(`mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`);

      resultEl.style.display = 'block';
      resultEl.style.color   = opened ? 'var(--green)' : 'var(--yellow)';
      resultEl.innerHTML     = opened
        ? '✅ Invoice email draft opened.<br><small style="color:var(--muted)">Review it in your mail app and send when ready.</small>'
        : '⚠ Mail app did not auto-open.<br><small style="color:var(--muted)">Copy the customer email and send the invoice manually.</small>';

      // Refresh table row badge
      applyFilters();
    } catch(err) {
      resultEl.style.display = 'block';
      resultEl.style.color   = 'var(--red)';
      resultEl.textContent   = '❌ ' + err.message;
    } finally {
      buttonEl.disabled    = false;
      buttonEl.textContent = '💳 Send Invoice';
    }
  }

  document.addEventListener('click', function(e) {
    const paypalSendBtn = e.target.closest('#pp-send-btn');
    if (paypalSendBtn) {
      void handlePaypalInvoiceSend(paypalSendBtn);
      return;
    }

    const mollieSendBtn = e.target.closest('#inv-send-btn');
    if (mollieSendBtn) {
      void handleMollieInvoiceSend(mollieSendBtn);
    }
  });

  function renderActivity(bookings) {
    const list  = document.getElementById('activity-list');
    const empty = document.getElementById('activity-empty');
    const load  = document.getElementById('activity-loading');
    if (load) load.style.display = 'none';

    const recent = [...bookings].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 8);
    if (!recent.length) { empty.style.display = 'block'; return; }

    const dotColor = { new: '#6366f1', pending: '#f59e0b', confirmed: '#10b981', cancelled: '#ef4444', completed: '#3b82f6' };

    list.style.display = 'block';
    list.innerHTML = recent.map(b => {
      const color = dotColor[(b.status || 'new').toLowerCase()] || '#6366f1';
      return `
        <li>
          <div class="activity-dot" style="background:${color};"></div>
          <div class="activity-content">
            <div class="activity-name">${escHtml(b.name || 'Unknown')}</div>
            <div class="activity-detail">${escHtml(b.item_title || b.booking_type || 'Booking')} · ${escHtml(b.status || 'new')}</div>
          </div>
          <div class="activity-time">${timeAgo(b.created_at)}</div>
        </li>`;
    }).join('');
  }

  function computeStats(bookings) {
    let pending = 0, confirmed = 0, cancelled = 0, deposits = 0;
    bookings.forEach(b => {
      const s = (b.status || '').toLowerCase();
      if (s === 'new' || s === 'pending') pending++;
      if (s === 'confirmed') confirmed++;
      if (s === 'cancelled') cancelled++;
      const d = parseFloat(b.deposit_amount);
      if (!isNaN(d) && d > 0) deposits += d;
    });
    document.getElementById('stat-total').textContent     = bookings.length;
    document.getElementById('stat-pending').textContent   = pending;
    document.getElementById('stat-confirmed').textContent = confirmed;
    document.getElementById('stat-cancelled').textContent = cancelled;
    document.getElementById('stat-deposits').textContent  = '฿' + Math.round(deposits).toLocaleString('en');
  }

  function applyFilters() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const status = document.getElementById('status-filter').value;
    const type   = document.getElementById('type-filter').value;

    const filtered = allBookings.filter(b => {
      const txt = [b.name, b.email, b.item_title, b.booking_source].join(' ').toLowerCase();
      if (search && !txt.includes(search)) return false;
      if (status && (b.status || '').toLowerCase() !== status) return false;
      if (type   && (b.booking_type || '').toLowerCase() !== type) return false;
      return true;
    });
    renderTable(filtered);
  }

  function escHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function payBadge(status) {
    const s = (status || 'unpaid').toLowerCase();
    const labels = { unpaid: '⬜ Unpaid', invoiced: '🟡 Invoiced', paid: '✅ Paid' };
    const cls    = { unpaid: 'pay-unpaid', invoiced: 'pay-invoiced', paid: 'pay-paid' };
    return `<span class="pay-badge ${cls[s]||'pay-unpaid'}">${labels[s]||s}</span>`;
  }

  async function loadDashboard(options = {}) {
    if (dashboardLoading) return;
    dashboardLoading = true;
    const silent = !!options.silent;

    try {
      const data = await fetchBookings();
      allBookings = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : (data.bookings || data.items || []));

      document.getElementById('bookings-loading').style.display = 'none';
      document.getElementById('activity-loading').style.display = 'none';

      computeStats(allBookings);
      renderActivity(allBookings);
      applyFilters();

      if (!filtersBound) {
        document.getElementById('search-input').addEventListener('input', applyFilters);
        document.getElementById('status-filter').addEventListener('change', applyFilters);
        document.getElementById('type-filter').addEventListener('change', applyFilters);
        filtersBound = true;
      }

    } catch (err) {
      console.error('KTD Dashboard load error:', err);
      if (!silent) {
        document.getElementById('bookings-loading').innerHTML = '<p style="color:var(--red);padding:20px;">Failed to load bookings. Check console.</p>';
        document.getElementById('activity-loading').innerHTML = '';
      }
    } finally {
      dashboardLoading = false;
    }
  }

  loadDashboard();

  dashboardRefreshTimer = window.setInterval(() => {
    loadDashboard({ silent: true });
  }, 30000);

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      loadDashboard({ silent: true });
    }
  });

  window.addEventListener('beforeunload', () => {
    if (dashboardRefreshTimer) {
      clearInterval(dashboardRefreshTimer);
    }
  });
})();
</script>

<!-- PayPal invoice modal -->
<div class="ktd-modal-overlay" id="paypal-invoice-modal">
  <div class="ktd-modal">
    <h3>🅿 Send PayPal Invoice</h3>
    <p class="modal-note">Generates a PayPal.me payment link and opens your email client with a pre-filled message.</p>
    <label>Customer Name</label>
    <input type="text" id="pp-name" placeholder="Jane Smith" />
    <label>Customer Email</label>
    <input type="email" id="pp-email" placeholder="jane@example.com" />
    <label>Amount (THB ฿)</label>
    <input type="number" id="pp-amount" placeholder="0" min="1" step="1" />
    <label>Description</label>
    <input type="text" id="pp-desc" placeholder="Diving in Asia — Booking #123" />
    <div id="pp-result" style="display:none;margin-bottom:12px;font-size:12px;line-height:1.6;"></div>
    <div class="modal-actions">
      <button class="btn-secondary" onclick="document.getElementById('paypal-invoice-modal').classList.remove('open')">Cancel</button>
      <button class="btn-primary" id="pp-send-btn">🅿 Send PayPal Invoice</button>
    </div>
  </div>
</div>

<!-- Invoice / Mollie payment link modal -->
<div class="ktd-modal-overlay" id="invoice-modal">
  <div class="ktd-modal">
    <h3>💳 Send Invoice Email</h3>
    <p class="modal-note">Opens your email client with a pre-filled invoice message for this booking.</p>
    <label>Customer Name</label>
    <input type="text" id="inv-name" placeholder="Jane Smith" />
    <label>Customer Email</label>
    <input type="email" id="inv-email" placeholder="jane@example.com" />
    <label>Amount (THB ฿)</label>
    <input type="number" id="inv-amount" placeholder="0" min="1" step="1" />
    <label>Description</label>
    <input type="text" id="inv-desc" placeholder="Diving in Asia — Booking #123" />
    <div id="inv-result" style="display:none;margin-bottom:12px;font-size:12px;line-height:1.6;"></div>
    <div class="modal-actions">
      <button class="btn-secondary" onclick="document.getElementById('invoice-modal').classList.remove('open')">Cancel</button>
      <button class="btn-primary" id="inv-send-btn">💳 Send Invoice</button>
    </div>
  </div>
</div>

<?php wp_footer(); ?>
</body>
</html>
<?php
// Prevent default WP template rendering
exit;
pt