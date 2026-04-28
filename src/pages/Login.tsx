import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { hasAdminAccess } from '@/lib/adminAccess';

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

      const { data } = await supabase.auth.getSession();
      const user = data.session?.user || null;
      if (!user) return;

      if (isAdminLogin && !hasAdminAccess(user)) {
        return;
      }

      if (user) {
        navigate(targetPath, { replace: true });
      }
    };

    checkExistingSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Avoid automatic bounce loops on /admin/login.
      if (isAdminLogin) return;

      const user = session?.user || null;
      if (!user) return;

      if (user) {
        navigate(targetPath, { replace: true });
      }
    });

    return () => subscription.unsubscribe();
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

          // Fallback: allow admin login via Supabase session when API route is not available.
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) {
            toast.error(error.message || 'Admin login failed');
            return;
          }

          const user = data.session?.user || null;
          if (!user || !hasAdminAccess(user)) {
            await supabase.auth.signOut();
            toast.error('Your account is signed in but does not have admin access.');
            return;
          }

          window.localStorage.setItem('admin_authenticated', '1');
          window.localStorage.removeItem('admin_login_token');
          toast.success('Admin login successful');
          navigate('/admin', { replace: true });
          return;
        } catch (err) {
          console.error(err);
          toast.error('Admin login failed');
          return;
        }
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error(error.message || 'Login failed');
      } else {
        toast.success('Logged in successfully');
        const isAdminLogin = location.pathname.startsWith('/admin');
        const hasSession = !!data.session;
        const user = data.session?.user || null;

        if (isAdminLogin && user && !hasAdminAccess(user)) {
          toast.error('Your account is signed in but does not have admin access.');
          return;
        }

        if (hasSession) {
          navigate(isAdminLogin ? '/admin' : '/account', { replace: true });
          return;
        }

        // Fallback when session state arrives asynchronously.
        setTimeout(async () => {
          const { data: sessionData } = await supabase.auth.getSession();
          const delayedUser = sessionData.session?.user || null;
          if (!delayedUser) return;

          if (isAdminLogin && !hasAdminAccess(delayedUser)) {
            toast.error('Your account is signed in but does not have admin access.');
            return;
          }

          if (sessionData.session) {
            navigate(isAdminLogin ? '/admin' : '/account', { replace: true });
          }
        }, 150);
      }
    } catch (err) {
      console.error(err);
      toast.error('Unexpected error');
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