import React from 'react';
import { supabase } from '@/integrations/supabase/client';

const CustomerLogin: React.FC = () => {
  // TODO: Add Supabase Auth UI or custom login form
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Customer Login</h2>
      {/* Supabase Auth UI or custom form goes here */}
      <p>Login to view your bookings.</p>
    </div>
  );
};

export default CustomerLogin;
