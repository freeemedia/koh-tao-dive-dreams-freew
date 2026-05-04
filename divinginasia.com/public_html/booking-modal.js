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
  form.innerHTML += '<input type="hidden" name="access_key" value="e4c4edf6-6e35-456a-87da-b32b961b449a">';
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
    // Let Web3Forms handle the actual form submit
    setTimeout(() => { modal.style.display = 'none'; }, 1000);
  };

});
