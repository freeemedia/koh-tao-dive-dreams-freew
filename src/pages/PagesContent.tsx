import React, { useEffect, useState } from 'react';

interface PageContentRow {
  id: string;
  page_slug: string;
  section_key: string;
  locale: 'en' | 'nl' | string;
  content_type?: string | null;
  content_value: string;
  updated_at?: string | null;
}

type GroupedContent = {
  [key: string]: {
    [section: string]: {
      en?: PageContentRow;
      nl?: PageContentRow;
    };
  };
};

const PagesContent: React.FC = () => {
  const [data, setData] = useState<PageContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '';
        const baseUrl = apiUrl || window.location.origin;
        const adminToken = window.localStorage.getItem('admin_login_token');
        const response = await fetch(`${baseUrl}/api/admin/page-content?listSlugs=true`, {
          headers: adminToken ? { 'x-admin-login-token': adminToken } : {},
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = await response.json();
        setData(Array.isArray(result) ? result : (result.data && Array.isArray(result.data) ? result.data : []));
        setError(null);
      } catch (err) {
        setError((err as any).message || 'Failed to load content');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Group by dive_site or page, then by section
  const grouped: GroupedContent = {};
  data.forEach(row => {
    const key = row.page_slug || 'Other';
    if (!grouped[key]) grouped[key] = {};
    if (!grouped[key][row.section_key]) grouped[key][row.section_key] = {};
    if (row.locale === 'en' || row.locale === 'nl') {
      grouped[key][row.section_key][row.locale] = row;
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1>Pages Content (EN / NL)</h1>
      {Object.entries(grouped).map(([site, sections]) => (
        <div key={site} className="mb-8">
          <h2 className="border-b border-gray-300">{site}</h2>
          <table className="mt-2 w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-left">Section</th>
                <th className="border border-gray-300 p-2 text-left">EN Content</th>
                <th className="border border-gray-300 p-2 text-left">NL Content</th>
                <th className="border border-gray-300 p-2 text-left">Type</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(sections).map(([section, langs]) => (
                <tr key={section}>
                  <td className="border border-gray-300 p-2">{section}</td>
                  <td className="border border-gray-300 p-2">{langs.en?.content_value || <em>—</em>}</td>
                  <td className="border border-gray-300 p-2">{langs.nl?.content_value || <em>—</em>}</td>
                  <td className="border border-gray-300 p-2">
                    {langs.en?.content_type || langs.nl?.content_type || 'text'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PagesContent;
