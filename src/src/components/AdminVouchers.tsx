
import jsPDF from 'jspdf';
// Map to your actual booking fields
function getDeposit(booking) {
  return typeof booking.deposit_amount === 'number' ? booking.deposit_amount : 0;
}
function getTotal(booking) {
  return typeof booking.total_amount === 'number' ? booking.total_amount : 0;
}
function getDue(booking) {
  if (typeof booking.due_amount === 'number') return booking.due_amount;
  const total = getTotal(booking);
  const deposit = getDeposit(booking);
  return total > 0 ? Math.max(total - deposit, 0) : 0;
}

export default function AdminVouchers({ bookings }) {
  const handleDownloadVoucher = (booking) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Dive Booking Voucher', 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${booking.name || ''}`, 20, 40);
    doc.text(`Email: ${booking.email || ''}`, 20, 50);
    doc.text(`Course: ${booking.course_title || ''}`, 20, 60);
    doc.text(`Deposit Paid: ฿${getDeposit(booking)}`, 20, 70);
    doc.text(`Total Price: ฿${getTotal(booking)}`, 20, 80);
    doc.text(`Amount Due: ฿${getDue(booking)}`, 20, 90);
    doc.text(`Booking Date: ${booking.created_at ? new Date(booking.created_at).toLocaleString() : ''}`, 20, 100);
    doc.text(`Booking ID: ${booking.id}`, 20, 110);
    doc.text('Show this voucher at the dive shop and pay the remaining balance.', 20, 130);
    doc.save(`voucher-${booking.id}.pdf`);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Vouchers</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Course</th>
            <th className="border px-2 py-1">Deposit</th>
            <th className="border px-2 py-1">Total</th>
            <th className="border px-2 py-1">Due</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Voucher</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td className="border px-2 py-1">{booking.name}</td>
              <td className="border px-2 py-1">{booking.email}</td>
              <td className="border px-2 py-1">{booking.course_title}</td>
              <td className="border px-2 py-1">฿{getDeposit(booking)}</td>
              <td className="border px-2 py-1">฿{getTotal(booking)}</td>
              <td className="border px-2 py-1">฿{getDue(booking)}</td>
              <td className="border px-2 py-1">{booking.created_at ? new Date(booking.created_at).toLocaleString() : ''}</td>
              <td className="border px-2 py-1">
                <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => handleDownloadVoucher(booking)}>
                  Download Voucher
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
