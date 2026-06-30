import { useEffect, useState } from 'react';

function SecurityModal({ isOpen, onDismiss }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '40px 32px',
          maxWidth: '500px',
          width: '90%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
        <h2
          style={{
            margin: '0 0 16px 0',
            fontSize: '24px',
            color: '#dc2626',
            fontWeight: '700',
          }}
        >
          SECURITY NOTICE
        </h2>
        <p
          style={{
            margin: '12px 0',
            color: '#374151',
            lineHeight: '1.6',
            fontSize: '14px',
          }}
        >
          This system is protected by enterprise-level security measures including network monitoring and access controls.
        </p>
        <p
          style={{
            margin: '12px 0',
            color: '#374151',
            lineHeight: '1.6',
            fontSize: '14px',
          }}
        >
          All access attempts are logged and monitored. Repeated unauthorized access attempts may trigger automated security protocols and legal action.
        </p>
        <p
          style={{
            margin: '12px 0',
            color: '#374151',
            lineHeight: '1.6',
            fontSize: '14px',
          }}
        >
          For legitimate administrative access, please contact your site administrator.
        </p>
        <button
          onClick={onDismiss}
          style={{
            marginTop: '24px',
            background: '#0369a1',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.target.style.background = '#0284c7')}
          onMouseLeave={(e) => (e.target.style.background = '#0369a1')}
        >
          I Acknowledge
        </button>
      </div>
    </div>
  );
}

export default function App({ Component, pageProps }) {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    // Show modal on page load and for failed attempts
    const params = new URLSearchParams(window.location.search);
    if (params.has('login') || params.has('error')) {
      setShowModal(true);
    }
  }, []);

  const handleDismissModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <SecurityModal isOpen={showModal} onDismiss={handleDismissModal} />
      <Component {...pageProps} />
    </>
  );
}
