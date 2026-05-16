import React, { useState } from 'react';

const BookingModalWeb3Forms: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button style={{background:'#0070ba',color:'#fff',padding:'0.75rem 1.5rem',border:'none',borderRadius:4,fontSize:'1rem',cursor:'pointer'}} onClick={() => setOpen(true)}>
        Book Now
      </button>
      {open && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.5)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',padding:'2rem',borderRadius:8,maxWidth:400,width:'100%',position:'relative'}}>
            <button onClick={() => setOpen(false)} style={{position:'absolute',top:8,right:8,fontSize:'1.5rem',background:'none',border:'none',cursor:'pointer'}}>&times;</button>
            <div style={{textAlign:'center',marginBottom:'1rem'}}>
              <img src="/images/logo.png" alt="Diving In Asia Logo" style={{maxWidth:180,height:'auto'}} />
            </div>
            <h2 style={{textAlign:'center'}}>Booking / Inquiry Form</h2>
            <form action="https://api.web3forms.com/submit" method="POST" style={{marginTop:'1rem'}}>
              <input type="hidden" name="access_key" value="b42b4f7a-b0b3-4ba9-8197-cf5abe9f09e6" />
              <input type="hidden" name="subject" value="New Booking Inquiry from Website" />
              <input type="hidden" name="redirect" value={`${window.location.origin}/thank-you`} />
              <label>Name<input type="text" name="name" required /></label>
              <label>Email<input type="email" name="email" required /></label>
              <label>Phone<input type="text" name="phone" /></label>
              <label>Course / Package<input type="text" name="course_title" /></label>
              <label>Preferred Date<input type="date" name="preferred_date" /></label>
              <label>Experience Level
                <select name="experience_level">
                  <option value="">Select...</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="professional">Professional</option>
                </select>
              </label>
              <label>Comments / Questions<textarea name="message" rows={4} required /></label>
              <button type="submit">Send Booking</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingModalWeb3Forms;
