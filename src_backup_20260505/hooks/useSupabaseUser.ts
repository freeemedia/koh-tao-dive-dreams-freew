import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useSupabaseUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) setUser(data?.user || null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, []);
  return user;
}
