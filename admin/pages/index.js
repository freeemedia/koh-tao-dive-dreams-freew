import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function AdminPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data, error } = await supabase
      .from('page_content')
      .select('*');
    if (error) setError(error.message);
    else setData(data);
    setLoading(false);
  }

  function getUniquePageSlugs() {
    return [...new Set(data.map(row => row.page_slug))];
  }

  function getSectionsForSlug(slug) {
    return [...new Set(data.filter(row => row.page_slug === slug).map(row => row.section_key))];
  }

  function getContent(slug, section, locale) {
    const row = data.find(r => r.page_slug === slug && r.section_key === section && r.locale === locale);
    return row ? row.content_value : '';
  }

  function getRowId(slug, section, locale) {
    const row = data.find(r => r.page_slug === slug && r.section_key === section && r.locale === locale);
    return row ? row.id : null;
  }

  function handleEdit(slug, section, locale, value) {
    setEditing({ ...editing, [`${slug}|${section}|${locale}`]: value });
  }

  async function handleSave(slug, section, locale) {
    const key = `${slug}|${section}|${locale}`;
    const value = editing[key];
    const id = getRowId(slug, section, locale);
    if (!id) return;
    const { error } = await supabase
      .from('page_content')
      .update({ content_value: value })
      .eq('id', id);
    if (!error) {
      setEditing(e => { const copy = { ...e }; delete copy[key]; return copy; });
      fetchData();
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const locales = ['en', 'nl'];

  return (
    <div style={{ padding: 32 }}>
      <h1>Page Content Admin</h1>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Page Slug</th>
            <th>Section</th>
            {locales.map(locale => <th key={locale}>{locale.toUpperCase()}</th>)}
          </tr>
        </thead>
        <tbody>
          {getUniquePageSlugs().map(slug => (
            getSectionsForSlug(slug).map(section => (
              <tr key={slug + section}>
                <td>{slug}</td>
                <td>{section}</td>
                {locales.map(locale => {
                  const key = `${slug}|${section}|${locale}`;
                  const value = editing[key] !== undefined ? editing[key] : getContent(slug, section, locale);
                  return (
                    <td key={locale}>
                      <textarea
                        value={value}
                        onChange={e => handleEdit(slug, section, locale, e.target.value)}
                        rows={4}
                        style={{ width: '100%' }}
                      />
                      <button onClick={() => handleSave(slug, section, locale)} disabled={editing[key] === undefined}>
                        Save
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
}

