import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import AdminBookings from '../components/AdminBookings';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem('admin_authenticated');
    window.localStorage.removeItem('admin_login_token');
    window.localStorage.removeItem('admin_view_token');
    sessionStorage.removeItem('admin_login_token');
    sessionStorage.removeItem('admin_view_token');
    toast.success('Logged out successfully');
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Admin</p>
            <h1 className="text-2xl font-bold text-slate-900">Bookings Dashboard</h1>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <main>
        <AdminBookings />
      </main>
    </div>
  );
};

export default Admin;