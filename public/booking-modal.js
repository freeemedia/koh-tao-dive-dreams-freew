// booking-modal.js
// Enhanced modal logic for Book Now / Inquiry with Web3Forms integration

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('booking-modal');
  const openBtn = document.querySelector('.book-now-btn');
  const closeBtn = document.getElementById('booking-modal-close');
  const form = modal.querySelector('form');
  const courseSelect = document.createElement('select');
  const priceDisplay = document.createElement('div');
  const depositDisplay = document.createElement('div');
  const payNowBtn = document.createElement('button');
  const sendInquiryBtn = document.createElement('button');

  // Example courses (replace with dynamic data if needed)
  const courses = [
    { name: 'Open Water', price: 12000 },
    { name: 'Advanced Open Water', price: 10500 },
    { name: 'Rescue Diver', price: 14000 },
    { name: 'Divemaster', price: 35000 },
  ];

  // Build course select
  courseSelect.name = 'course';
  courseSelect.required = true;
  courseSelect.innerHTML = '<option value="">Select a course</option>' +
    courses.map(c => `<option value="${c.name}" data-price="${c.price}">${c.name} (฿${c.price})</option>`).join('');

  // Set up Web3Forms endpoint and hidden access key (replace with your key)
  form.action = 'https://api.web3forms.com/submit';
  form.method = 'POST';
  form.setAttribute('accept-charset', 'UTF-8');
  form.setAttribute('autocomplete', 'on');
  form.innerHTML = '';
  form.innerHTML += '<input type="hidden" name="access_key" value="b42b4f7a-b0b3-4ba9-8197-cf5abe9f09e6">';
  // Add PayPal link hidden field (will be updated dynamically)
  form.innerHTML += '<input type="hidden" name="paypal_link" id="paypal_link_field">';
  form.appendChild(courseSelect);
  form.appendChild(priceDisplay);
  form.appendChild(depositDisplay);

  // Name
  form.innerHTML += '<label>Name:<input name="name" required></label>';
  // Contact
  form.innerHTML += '<label>Contact (Email/Phone):<input name="contact" required></label>';
  // Accommodation
  form.innerHTML += '<label>Accommodation Choice:<input name="accommodation"></label>';
  // Diving experience
  form.innerHTML += '<label>Diving Experience:<select name="experience"><option value="">Select</option><option value="certified">Certified Diver</option><option value="beginner">Beginner</option></select></label>';

  // Payment buttons
  payNowBtn.type = 'button';
  payNowBtn.textContent = 'Pay 20% Deposit Now';
  payNowBtn.style.marginRight = '1rem';
  sendInquiryBtn.type = 'submit';
  sendInquiryBtn.textContent = 'Send Inquiry';
  form.appendChild(payNowBtn);
  form.appendChild(sendInquiryBtn);

  // Modal open/close
  openBtn.onclick = () => { modal.style.display = 'flex'; };
  closeBtn.onclick = () => { modal.style.display = 'none'; };
  window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

  // Update price/deposit on course select
  courseSelect.onchange = function () {
    const selected = courseSelect.options[courseSelect.selectedIndex];
    const price = selected.dataset.price ? parseFloat(selected.dataset.price) : 0;
    priceDisplay.textContent = price ? `Course Price: ฿${price}` : '';
    depositDisplay.textContent = price ? `20% Deposit: ฿${Math.round(price * 0.2)}` : '';
    payNowBtn.disabled = !price;
    // Update PayPal link hidden field
    const paypalField = document.getElementById('paypal_link_field');
    if (paypalField) {
      paypalField.value = price ? `https://paypal.me/divinginasia/${Math.round(price * 0.2)}THB` : '';
    }
  };
  payNowBtn.disabled = true;

  // Pay Now logic (Stripe/PayPal integration placeholder)
  payNowBtn.onclick = function () {
    const selected = courseSelect.options[courseSelect.selectedIndex];
    const price = selected.dataset.price ? parseFloat(selected.dataset.price) : 0;
    if (!price) return;
    // TODO: Integrate Stripe/PayPal checkout here
    alert('Redirecting to payment for ฿' + Math.round(price * 0.2) + ' deposit.');
    // After payment, collect form data and send to backend/email if needed
  };

  // Let Web3Forms handle inquiry submission AND also save to local DB
  form.onsubmit = function (e) {
    // Gather form data
    const fd = new FormData(form);
    const bookingData = {
      name: fd.get('name') || '',
      email: fd.get('contact') || '',
      phone: '',
      item_type: 'course',
      course_title: fd.get('course') || '',
      preferred_date: '',
      experience_level: fd.get('experience') || '',
      addons: '',
      addons_json: '',
      addons_total: 0,
      subtotal_amount: 0,
      total_payable_now: 0,
      internal_notes: '',
      message: '',
      status: 'pending',
    };
    // Save to local DB (non-blocking)
    fetch('/api/sqlite-bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    // Show success message in modal instead of closing
    setTimeout(() => {
      // Get PayPal link value
      const paypalField = document.getElementById('paypal_link_field');
      const paypalLink = paypalField && paypalField.value ? paypalField.value : '';
      form.innerHTML = '<div style="text-align:center;padding:2em 0;">'
        + '<h2 style="color:#22c55e;font-size:2em;margin-bottom:0.5em;">Success!</h2>'
        + '<p>Thank you! Your enquiry has been sent.<br>We will contact you soon.</p>'
        + (paypalLink ? `<div style=\"margin:1.5em 0;\"><a href=\"${paypalLink}\" target=\"_blank\" style=\"display:inline-block;padding:0.75em 2em;background:#0070ba;color:#fff;border-radius:4px;font-size:1.1em;text-decoration:none;font-weight:bold;\">Pay Deposit via PayPal</a></div>` : '')
        + '<div style="margin-top:2em;">'
        + '<button id="booking-modal-close-success" style="margin-right:1em;padding:0.75em 2em;background:#0070ba;color:#fff;border:none;border-radius:4px;font-size:1em;cursor:pointer;">Close</button>'
        + '<button id="booking-modal-go-home" style="padding:0.75em 2em;background:#22c55e;color:#fff;border:none;border-radius:4px;font-size:1em;cursor:pointer;">Go Home</button>'
        + '</div>'
        + '</div>';
      const goHomeBtn = document.getElementById('booking-modal-go-home');
      if (goHomeBtn) goHomeBtn.onclick = () => { window.location.href = '/'; };
      const closeSuccessBtn = document.getElementById('booking-modal-close-success');
      if (closeSuccessBtn) closeSuccessBtn.onclick = () => {
        modal.style.display = 'none';
        window.location.href = '/';
      };
      // Auto-redirect after 5 seconds
      setTimeout(() => {
        modal.style.display = 'none';
        window.location.href = '/';
      }, 5000);
    }, 500);
  };

});
