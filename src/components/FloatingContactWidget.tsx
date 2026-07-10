import React, { useState } from 'react';

const FloatingContactWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Floating WhatsApp/Contact Button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 2000,
          background: '#25d366',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 56,
          height: 56,
          boxShadow: '0 2px 8px #0002',
          fontSize: 28,
          cursor: 'pointer',
        }}
        aria-label="Contact Us via WhatsApp"
      >
        <span role="img" aria-label="WhatsApp">💬</span>
      </button>
      {/* Modal Contact Form */}
      {open && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.4)',
          zIndex: 2100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 8,
            padding: '2rem',
            maxWidth: 340,
            width: '100%',
            position: 'relative',
            boxShadow: '0 2px 16px #0003',
          }}>
            <button
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'none',
                border: 'none',
                fontSize: 24,
                cursor: 'pointer',
              }}
              aria-label="Close"
            >
              ×
            </button>
            <h3 style={{textAlign:'center',marginBottom:'1rem'}}>Contact Us</h3>
            <p style={{textAlign:'center',marginBottom:'1rem'}}>For quick replies, message us on WhatsApp:</p>
            <a
              href="https://wa.me/66639230132"
              target="_blank"
              rel="noopener"
              style={{
                display: 'block',
                background: '#25d366',
                color: '#fff',
                borderRadius: 4,
                padding: '0.75rem 1rem',
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                textDecoration: 'none',
              }}
            >
              WhatsApp: +66 63 923 0132
            </a>
            <form action="mailto:bookings@divinginasia.com" method="POST" style={{marginTop:'1rem'}}>
              <label style={{display:'block',marginBottom:8}}>
                Your Email
                <input type="email" name="email" required style={{width:'100%',padding:8,marginTop:4,marginBottom:12,border:'1px solid #ccc',borderRadius:4}} />
              </label>
              <label style={{display:'block',marginBottom:8}}>
                Message
                <textarea name="message" rows={3} required style={{width:'100%',padding:8,marginTop:4,marginBottom:12,border:'1px solid #ccc',borderRadius:4}} />
              </label>
              <button type="submit" style={{background:'#0070ba',color:'#fff',padding:'0.75rem 1.5rem',border:'none',borderRadius:4,fontSize:'1rem',cursor:'pointer',width:'100%'}}>Send</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingContactWidget;
