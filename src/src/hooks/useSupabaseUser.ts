import { useEffect, useState } from 'react';

export function useSupabaseUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    // Check for user_auth_token in localStorage
    const token = window.localStorage.getItem('user_auth_token');
    if (mounted && token) {
      // Minimal user object for non-admin routes that use this hook
      setUser({ token, authenticated: true });
    } else if (mounted) {
      setUser(null);
    }

    // Listen for storage changes (e.g., logout from another tab)
    const handleStorageChange = () => {
      const updatedToken = window.localStorage.getItem('user_auth_token');
      if (mounted) {
        setUser(updatedToken ? { token: updatedToken, authenticated: true } : null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      mounted = false;
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return user;
}
