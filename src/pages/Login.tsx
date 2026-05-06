import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const buildApiUrl = (path: string) => {
  const rawBase = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '').trim();
  const base = rawBase.replace(/\/$/, '');
  return base ? `${base}${path}` : path;
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminLogin = location.pathname.startsWith('/admin');

  useEffect(() => {
    const targetPath = isAdminLogin ? '/admin' : '/account';

    const checkExistingSession = async () => {
      if (isAdminLogin && window.localStorage.getItem('admin_authenticated') === '1') {
        navigate('/admin', { replace: true });
        return;
      }

      // For non-admin users, check if they have a stored token from API auth
      const userToken = window.localStorage.getItem('user_auth_token');
      if (userToken && !isAdminLogin) {
        navigate('/account', { replace: true });
        return;
      }
    };

    checkExistingSession();
  }, [isAdminLogin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please provide email and password');
      return;
    }

    setIsLoading(true);
    try {
      if (isAdminLogin) {
        try {
          const response = await fetch(buildApiUrl('/api/admin-login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          if (response.ok) {
            const payload = await response.json().catch(() => ({}));
            if (payload?.success) {
              window.localStorage.setItem('admin_authenticated', '1');
              if (payload?.token) {
                window.localStorage.setItem('admin_login_token', payload.token);
              }
              toast.success('Admin login successful');
              navigate('/admin', { replace: true });
              return;
            }
          }

          toast.error('Admin login failed');
          return;
        } catch (err) {
          console.error(err);
          toast.error('Admin login failed');
          return;
        }
      }

      // Standard user login via API
      try {
        const response = await fetch(buildApiUrl('/api/user-login'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const payload = await response.json().catch(() => ({}));
          if (payload?.success && payload?.token) {
            window.localStorage.setItem('user_auth_token', payload.token);
            toast.success('Logged in successfully');
            navigate('/account', { replace: true });
            return;
          }
        }

        toast.error('Login failed');
      } catch (err) {
        console.error(err);
        toast.error('Unexpected error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-16">
      <div className="max-w-md w-full bg-background rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Log in to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Logging in...' : 'Log in'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;