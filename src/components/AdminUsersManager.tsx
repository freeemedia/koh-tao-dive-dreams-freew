import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

type AppRole = 'admin' | 'user';

interface UserRoleRow {
  id?: string;
  user_id: string;
  role: AppRole;
  created_at?: string;
}

interface ProfileRow {
  id: string;
  full_name?: string | null;
  phone?: string | null;
  created_at?: string;
}

interface AuditRow {
  id: string;
  action: 'add' | 'remove';
  target_user_id: string;
  role: AppRole;
  changed_by_email?: string | null;
  note?: string | null;
  created_at?: string;
}

const shortId = (value: string) => `${value.slice(0, 8)}...${value.slice(-6)}`;

const AdminUsersManager: React.FC = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<UserRoleRow[]>([]);
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [auditRows, setAuditRows] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [userIdDraft, setUserIdDraft] = useState('');
  const [searchDraft, setSearchDraft] = useState('');
  const [roleDraft, setRoleDraft] = useState<AppRole>('user');
  const [noteDraft, setNoteDraft] = useState('');

  const authedFetch = async (url: string, init?: RequestInit) => {
    const adminLoginToken = window.localStorage.getItem('admin_login_token');

    if (!adminLoginToken) {
      throw new Error('No authenticated session found. Please sign in again.');
    }

    const headers = new Headers(init?.headers || {});
    headers.set('x-admin-login-token', adminLoginToken);
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

    return fetch(url, { ...init, headers });
  };

  const fetchRoles = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await authedFetch('/api/admin/user-roles');
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(payload?.error || 'Failed to load user roles');
      setRows((payload.roles || []) as UserRoleRow[]);
      setProfiles((payload.profiles || []) as ProfileRow[]);
      setAuditRows((payload.audit || []) as AuditRow[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user data');
      setRows([]);
      setProfiles([]);
      setAuditRows([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const grouped = useMemo(() => {
    const m = new Map<string, AppRole[]>();
    rows.forEach((row) => {
      if (!m.has(row.user_id)) m.set(row.user_id, []);
      m.get(row.user_id)!.push(row.role);
    });
    return Array.from(m.entries()).map(([userId, roles]) => ({ userId, roles }));
  }, [rows]);

  const profileMap = useMemo(() => {
    const map = new Map<string, ProfileRow>();
    profiles.forEach((p) => map.set(p.id, p));
    return map;
  }, [profiles]);

  const selectableUsers = useMemo(() => {
    const ids = new Set<string>();
    profiles.forEach((p) => ids.add(p.id));
    rows.forEach((r) => ids.add(r.user_id));
    return Array.from(ids);
  }, [profiles, rows]);

  const matchingUsers = useMemo(() => {
    const q = searchDraft.trim().toLowerCase();
    if (!q) return selectableUsers.slice(0, 8);

    return selectableUsers
      .filter((userId) => {
        const profile = profileMap.get(userId);
        const fullName = (profile?.full_name || '').toLowerCase();
        const phone = (profile?.phone || '').toLowerCase();
        return userId.toLowerCase().includes(q) || fullName.includes(q) || phone.includes(q);
      })
      .slice(0, 12);
  }, [searchDraft, selectableUsers, profileMap]);

  const addRole = async () => {
    const userId = userIdDraft.trim();
    if (!userId) {
      alert('Enter a user UUID first.');
      return;
    }

    setSaving(true);
    try {
      const res = await authedFetch('/api/admin/user-roles', {
        method: 'POST',
        body: JSON.stringify({ action: 'add', user_id: userId, role: roleDraft, note: noteDraft.trim() || null }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(payload?.error || 'Failed to add role');
      setUserIdDraft('');
      setSearchDraft('');
      setNoteDraft('');
      await fetchRoles();
    } catch (err) {
      alert('Error adding role: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSaving(false);
    }
  };

  const removeRole = async (userId: string, role: AppRole) => {
    const confirmed = window.confirm(`Remove ${role} role from ${userId}?`);
    if (!confirmed) return;

    setSaving(true);
    try {
      const res = await authedFetch('/api/admin/user-roles', {
        method: 'POST',
        body: JSON.stringify({ action: 'remove', user_id: userId, role, note: noteDraft.trim() || null }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(payload?.error || 'Failed to remove role');
      setNoteDraft('');
      await fetchRoles();
    } catch (err) {
      alert('Error removing role: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{t('admin.users_title', { defaultValue: 'Users' })}</h2>

      <div className="rounded border border-gray-200 p-3">
        <div className="mb-2 text-sm font-semibold">{t('admin.users_add_role', { defaultValue: 'Add User Role' })}</div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-6">
          <input
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}
            placeholder={t('admin.users_search_placeholder', { defaultValue: 'Search by name, phone, or UUID' })}
            className="rounded border border-gray-300 px-3 py-2 md:col-span-2"
          />
          <input
            value={userIdDraft}
            onChange={(e) => setUserIdDraft(e.target.value)}
            placeholder={t('admin.users_uuid_placeholder', { defaultValue: 'Supabase user UUID' })}
            className="rounded border border-gray-300 px-3 py-2 md:col-span-2"
          />
          <select
            value={roleDraft}
            onChange={(e) => setRoleDraft(e.target.value as AppRole)}
            className="rounded border border-gray-300 px-3 py-2"
            aria-label="Role to assign"
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <input
            value={noteDraft}
            onChange={(e) => setNoteDraft(e.target.value)}
            placeholder={t('admin.users_optional_audit_note', { defaultValue: 'Optional audit note' })}
            className="rounded border border-gray-300 px-3 py-2"
          />
          <button
            type="button"
            onClick={addRole}
            disabled={saving}
            className="rounded bg-blue-600 px-3 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? t('admin.saving', { defaultValue: 'Saving...' }) : t('admin.users_add_role_button', { defaultValue: 'Add Role' })}
          </button>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {matchingUsers.map((userId) => {
            const profile = profileMap.get(userId);
            const label = profile?.full_name ? `${profile.full_name} (${shortId(userId)})` : shortId(userId);
            return (
              <button
                key={userId}
                type="button"
                onClick={() => setUserIdDraft(userId)}
                className="rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
                title={userId}
              >
                {label}
              </button>
            );
          })}
          {!matchingUsers.length ? <div className="text-xs text-gray-500">{t('admin.users_no_matches', { defaultValue: 'No matching users.' })}</div> : null}
        </div>
      </div>

      {loading ? <div>{t('admin.users_loading', { defaultValue: 'Loading users...' })}</div> : null}
      {error ? <div className="text-red-600">Error: {error}</div> : null}

      {!loading && !error && (
        <div className="overflow-x-auto rounded border border-gray-200">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 p-2 text-left">{t('admin.users_user_id', { defaultValue: 'User ID' })}</th>
                <th className="border border-gray-200 p-2 text-left">{t('admin.users_roles', { defaultValue: 'Roles' })}</th>
              </tr>
            </thead>
            <tbody>
              {grouped.map((row) => (
                <tr key={row.userId}>
                  <td className="border border-gray-200 p-2 text-xs md:text-sm">
                    <div>{profileMap.get(row.userId)?.full_name || t('admin.users_unknown_user', { defaultValue: 'Unknown user' })}</div>
                    <div className="text-[11px] text-gray-500" title={row.userId}>{row.userId}</div>
                  </td>
                  <td className="border border-gray-200 p-2">
                    <div className="flex flex-wrap gap-2">
                      {row.roles.map((role) => (
                        <span
                          key={`${row.userId}-${role}`}
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${role === 'admin' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}
                        >
                          {role}
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => removeRole(row.userId, role)}
                            title={t('admin.users_remove_role_title', { defaultValue: 'Remove role' })}
                          >
                            {t('admin.users_remove', { defaultValue: 'remove' })}
                          </button>
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {grouped.length === 0 && (
                <tr>
                  <td className="p-3 text-sm text-gray-500" colSpan={2}>
                    {t('admin.users_no_roles_found', { defaultValue: 'No user roles found.' })}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && (
        <div className="rounded border border-gray-200 p-3">
          <div className="mb-2 text-sm font-semibold">{t('admin.users_role_change_audit', { defaultValue: 'Role Change Audit' })}</div>
          <div className="max-h-64 overflow-auto">
            <table className="min-w-full border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-2 text-left">{t('admin.users_when', { defaultValue: 'When' })}</th>
                  <th className="border border-gray-200 p-2 text-left">{t('admin.users_action', { defaultValue: 'Action' })}</th>
                  <th className="border border-gray-200 p-2 text-left">{t('admin.users_target_user', { defaultValue: 'Target User' })}</th>
                  <th className="border border-gray-200 p-2 text-left">{t('admin.users_role', { defaultValue: 'Role' })}</th>
                  <th className="border border-gray-200 p-2 text-left">{t('admin.users_changed_by', { defaultValue: 'Changed By' })}</th>
                  <th className="border border-gray-200 p-2 text-left">{t('admin.users_note', { defaultValue: 'Note' })}</th>
                </tr>
              </thead>
              <tbody>
                {auditRows.map((audit) => (
                  <tr key={audit.id}>
                    <td className="border border-gray-200 p-2">{audit.created_at ? new Date(audit.created_at).toLocaleString() : '-'}</td>
                    <td className="border border-gray-200 p-2">{audit.action}</td>
                    <td className="border border-gray-200 p-2" title={audit.target_user_id}>{shortId(audit.target_user_id)}</td>
                    <td className="border border-gray-200 p-2">{audit.role}</td>
                    <td className="border border-gray-200 p-2">{audit.changed_by_email || '-'}</td>
                    <td className="border border-gray-200 p-2">{audit.note || '-'}</td>
                  </tr>
                ))}
                {!auditRows.length && (
                  <tr>
                    <td className="p-3 text-sm text-gray-500" colSpan={6}>{t('admin.users_no_audit_rows', { defaultValue: 'No audit rows yet.' })}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersManager;
