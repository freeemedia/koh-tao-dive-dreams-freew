type SupabaseUserLike = {
  email?: string | null;
  app_metadata?: Record<string, any> | null;
  user_metadata?: Record<string, any> | null;
};

const normalizeEmail = (value = '') => String(value).trim().toLowerCase();

const parseAllowedAdminEmails = () => {
  const raw = (import.meta.env.VITE_ADMIN_EMAILS || '').trim();
  return raw
    .split(',')
    .map(normalizeEmail)
    .filter(Boolean);
};

export const getAdminAccessConfig = () => {
  const allowlist = parseAllowedAdminEmails();
  return {
    allowlistEnabled: allowlist.length > 0,
    allowlistCount: allowlist.length,
  };
};

export const hasAdminAccess = (user: SupabaseUserLike | null | undefined) => {
  if (!user) return false;

  // Local development convenience: any authenticated user can access admin tools.
  if (import.meta.env.DEV) return true;

  const appRole = user.app_metadata?.app_role;
  const userRole = user.user_metadata?.app_role || user.user_metadata?.role;
  
  // Debug logging
  console.log('[Admin Access Check]', {
    userEmail: user.email,
    appRole,
    userRole,
    envVar: import.meta.env.VITE_ADMIN_EMAILS,
    allowedEmails: parseAllowedAdminEmails(),
  });
  
  if (appRole === 'admin' || userRole === 'admin') return true;

  const allowedEmails = parseAllowedAdminEmails();
  if (!allowedEmails.length) return false;

  const hasAccess = allowedEmails.includes(normalizeEmail(user.email || ''));
  console.log('[Admin Access Result]', hasAccess);
  
  return hasAccess;
};
