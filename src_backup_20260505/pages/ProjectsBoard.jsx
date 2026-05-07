import React from 'react';

const ProjectsBoard = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>Projects Board</h1>
    <p>
      Manage all your bookings, issues, and project updates in Jira.<br />
      Click the button below to open the full board in a new tab.
    </p>
    <a
      href="https://divinginasia.atlassian.net/jira/core/projects/PRO/board?filter=&groupBy=status"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        padding: '1rem 2rem',
        background: '#0052CC',
        color: '#fff',
        borderRadius: '5px',
        textDecoration: 'none',
        fontWeight: 'bold',
        margin: '2rem 0',
      }}
    >
      Open Projects Board
    </a>
    <p style={{ color: '#888', marginTop: '2rem' }}>
      (Direct embedding is not supported by Jira. Use the button above to access your board.)
    </p>
  </div>
);

export default ProjectsBoard;
