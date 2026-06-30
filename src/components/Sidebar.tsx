import React from 'react';

const Sidebar = () => (
  <aside style={{
    width: 220,
    background: '#0a2239',
    color: 'white',
    minHeight: '100vh',
    padding: '2rem 1rem',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
  }}>
    <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 32 }}>Admin Menu</h2>
    <nav>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={{ marginBottom: 18 }}><a href="/admin" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</a></li>
        <li style={{ marginBottom: 18 }}><a href="/admin/bookings" style={{ color: 'white', textDecoration: 'none' }}>Bookings</a></li>
        <li style={{ marginBottom: 18 }}><a href="/admin/pages" style={{ color: 'white', textDecoration: 'none' }}>Pages Manager</a></li>
        <li style={{ marginBottom: 18 }}><a href="/admin/users" style={{ color: 'white', textDecoration: 'none' }}>Users</a></li>
        <li><a href="/admin/settings" style={{ color: 'white', textDecoration: 'none' }}>Settings</a></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
