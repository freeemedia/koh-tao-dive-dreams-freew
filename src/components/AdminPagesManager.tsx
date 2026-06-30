import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';

interface PageContentRow {
  id: string;
  page_slug: string;
  section_key: string;
  locale: 'en' | 'nl' | string;
  content_type?: string;
  content_value: string;
  updated_at?: string;
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeightClassName?: string;
}

const escapeHtml = (input: string) =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const textToEditorHtml = (input: string) => {
  if (!input) return '';
  return escapeHtml(input).replace(/\n/g, '<br />');
};

const normalizeText = (input: string) => input.replace(/\r\n/g, '\n').trimEnd();

const htmlToPlainText = (input: string) =>
  String(input || '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6])>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\n\s*\n+/g, '\n')
    .trim();

const normalizeEditorValue = (value: string) => {
  const raw = String(value || '');
  if (!raw.includes('<') && !raw.includes('&lt;') && !raw.includes('&gt;')) {
    return raw;
  }

  return htmlToPlainText(raw);
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder,
  minHeightClassName = 'min-h-[120px]',
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Placeholder.configure({
        placeholder: placeholder || 'Start typing...',
      }),
    ],
    content: textToEditorHtml(value || ''),
    editorProps: {
      attributes: {
        class: `${minHeightClassName} rounded border border-gray-300 p-2 focus:outline-none`,
      },
    },
    onUpdate: ({ editor: current }) => {
      const plainText = current.getText({ blockSeparator: '\n' });
      onChange(plainText);
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = normalizeText(editor.getText({ blockSeparator: '\n' }));
    const next = normalizeText(value || '');
    if (next !== current) {
      editor.commands.setContent(textToEditorHtml(value || ''), false);
    }
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`rounded border px-2 py-1 text-xs ${editor.isActive('bold') ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>Bold</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`rounded border px-2 py-1 text-xs ${editor.isActive('italic') ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>Italic</button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`rounded border px-2 py-1 text-xs ${editor.isActive('underline') ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>Underline</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`rounded border px-2 py-1 text-xs ${editor.isActive('bulletList') ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>Bullets</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`rounded border px-2 py-1 text-xs ${editor.isActive('orderedList') ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}>Numbered</button>
        <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className="rounded border px-2 py-1 text-xs bg-white text-gray-700">Paragraph</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

const DIVE_SITE_SLUGS = [
  'sail-rock', 'shark-island', 'htms-sattakut', 'japanese-gardens',
  'mango-bay', 'twins-pinnacle', 'south-west-pinnacle', 'chumphon-pinnacle',
];

const DIVE_SITE_SECTION_ORDER = [
  'overview',
  'quick_facts_depth',
  'quick_facts_difficulty',
  'quick_facts_location',
  'quick_facts_best_time',
  'what_you_can_see',
  'marine_life_highlights',
  'diving_tips',
  'images',
];

const normalizeDiveSiteSlug = (slug: string) => String(slug || '').replace(/^dive-sites\//, '');
const isDiveSiteSlug = (slug: string) => DIVE_SITE_SLUGS.includes(normalizeDiveSiteSlug(slug));
const getCanonicalPageSlug = (slug: string) =>
  isDiveSiteSlug(slug) ? `dive-sites/${normalizeDiveSiteSlug(slug)}` : String(slug || '');
const getPageSlugAliases = (slug: string) => {
  if (!isDiveSiteSlug(slug)) return [String(slug || '')];
  const short = normalizeDiveSiteSlug(slug);
  return [`dive-sites/${short}`, short];
};
const matchesSelectedPageSlug = (rowPageSlug: string, selected: string) =>
  getPageSlugAliases(selected).includes(String(rowPageSlug || ''));
const isHiddenInPageEditor = (sectionKey: string) => sectionKey === 'images';

const toSectionLabel = (sectionKey: string) =>
  sectionKey
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

const EDITOR_GROUP_ORDER = [
  'Hero',
  'Content',
  'Calls To Action',
  'Finance',
  'Schedule',
  'FAQ',
  'Media',
  'SEO',
  'Other',
];

const getEditorGroup = (sectionKey: string) => {
  const key = String(sectionKey || '').toLowerCase();

  if (/hero|headline|subtitle|banner/.test(key)) return 'Hero';
  if (/cta|button|book|enquire|inquire|contact/.test(key)) return 'Calls To Action';
  if (/paypal|pay_pal|payment|deposit|amount|price|currency|bank|iban|swift|invoice|fee|cost|thb|usd|eur/.test(key)) return 'Finance';
  if (/schedule|time|day|duration|trip|program/.test(key)) return 'Schedule';
  if (/faq|question|answer/.test(key)) return 'FAQ';
  if (/image|img|photo|gallery|video|alt/.test(key)) return 'Media';
  if (/seo|meta|slug|keyword|description/.test(key)) return 'SEO';
  if (/title|overview|body|content|text|description|intro|highlight|tips|requirements/.test(key)) return 'Content';
  return 'Other';
};

const shouldForcePlainTextEditor = (sectionKey: string, contentType?: string) => {
  const key = String(sectionKey || '').toLowerCase();
  const type = String(contentType || '').toLowerCase();

  if (/(image|img|photo|gallery|video|url|link|src|icon|logo|path|slug)/.test(key)) {
    return true;
  }

  if (/(image|media|url|link|path|json)/.test(type)) {
    return true;
  }

  return false;
};

const normalizeMediaLikeValue = (sectionKey: string, contentType: string | undefined, value: string) => {
  if (!shouldForcePlainTextEditor(sectionKey, contentType)) {
    return value;
  }

  return normalizeEditorValue(String(value || ''))
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .split(/\r?\n/)
    .map((line) =>
      line
        .replace(/^\s*[-*•]+\s*/, '')
        .replace(/^\s*\d+[\.)]\s*/, '')
        .trim()
    )
    .filter(Boolean)
    .join('\n');
};

const getPageGroup = (pageSlug: string) => {
  const slug = String(pageSlug || '').toLowerCase();

  if (['open-water', 'discover-scuba', 'discover-scuba-deluxe', 'scuba-diver', 'scuba-review'].includes(slug)) {
    return 'Beginner';
  }

  if (['advanced', 'rescue', 'efr'].includes(slug)) {
    return 'Advanced';
  }

  if (['divemaster', 'instructor', 'msdt-program'].includes(slug)) {
    return 'Professional';
  }

  if (slug.startsWith('specialty/')) {
    return 'Specialties';
  }

  if (slug.startsWith('dive-sites/') || isDiveSiteSlug(slug)) {
    return 'Dive Sites';
  }

  if (slug.startsWith('marine-life/')) {
    return 'Marine Life';
  }

  if (['home', 'contact', 'accommodation', 'koh-tao-info', 'how-to-get-here', 'things-to-do', 'weather'].includes(slug)) {
    return 'Info';
  }

  return 'Other';
};

const GROUP_ORDER = ['Beginner', 'Advanced', 'Professional', 'Specialties', 'Dive Sites', 'Marine Life', 'Info', 'Other'];
const LOCALE_FILTERS = ['en', 'nl'] as const;
const CONTENT_FILTERS = ['hero', 'prices', 'faq'] as const;

const AdminPagesManager: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<PageContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editorMode, setEditorMode] = useState<'page' | 'rows'>('page');

  const [selectedPageSlug, setSelectedPageSlug] = useState('');
  const [selectedLocale, setSelectedLocale] = useState<'en' | 'nl'>('en');
  const [pageDraft, setPageDraft] = useState<Record<string, string>>({});
  const [savingPage, setSavingPage] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editContentType, setEditContentType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('all');
  const [showIds, setShowIds] = useState(false);
  const [quickFilters, setQuickFilters] = useState<string[]>([]);
  const [recentlyEdited, setRecentlyEdited] = useState<Record<string, boolean>>({});

  const buildApiUrl = (path: string) => {
    const rawBase = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '').trim();
    const base = rawBase.replace(/\/$/, '');
    return base ? `${base}${path}` : path;
  };
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newSectionKey, setNewSectionKey] = useState('');
  const [newLocale, setNewLocale] = useState<'en' | 'nl'>('en');
  const [newContentType, setNewContentType] = useState('text');
  const [newContentValue, setNewContentValue] = useState('');
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [useWysiwyg, setUseWysiwyg] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const adminToken = window.localStorage.getItem('admin_login_token');
      if (!adminToken) {
        setError('Not authenticated. Please login first.');
        setLoading(false);
        return;
      }

      // Fetch all available page slugs from WordPress
      const response = await fetch(buildApiUrl('/api/admin/page-content?listSlugs=true'), {
        headers: {
          'x-admin-login-token': adminToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch page slugs (${response.status})`);
      }

      const slugs = await response.json();
      // Convert slugs to PageContentRow format for display
      // For now, we'll fetch full content for each slug dynamically
      setData([]);
      setLoading(false);
    } catch (err) {
      setError((err as any).message || 'Failed to load page content');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const availablePageSlugs = useMemo(() => {
    const seededDiveSites = DIVE_SITE_SLUGS.map((slug) => `dive-sites/${slug}`);
    const unique = Array.from(
      new Set([...data.map((row) => getCanonicalPageSlug(row.page_slug)), ...seededDiveSites])
    );
    unique.sort((a, b) => a.localeCompare(b));
    return unique;
  }, [data]);

  const groupedPageSlugs = useMemo(() => {
    const grouped = new Map<string, string[]>();

    availablePageSlugs.forEach((slug) => {
      const group = getPageGroup(slug);
      if (!grouped.has(group)) grouped.set(group, []);
      grouped.get(group)!.push(slug);
    });

    return GROUP_ORDER
      .map((group) => ({ group, slugs: grouped.get(group) || [] }))
      .filter((entry) => entry.slugs.length > 0);
  }, [availablePageSlugs]);

  useEffect(() => {
    if (!selectedPageSlug && availablePageSlugs.length > 0) {
      const preferredDiveSite = availablePageSlugs.find((slug) => isDiveSiteSlug(slug));
      setSelectedPageSlug(preferredDiveSite || availablePageSlugs[0]);
    }
  }, [availablePageSlugs, selectedPageSlug]);

  const pageSectionKeys = useMemo(() => {
    if (!selectedPageSlug) return [] as string[];

    const keys = new Set(
      data
        .filter((row) => matchesSelectedPageSlug(row.page_slug, selectedPageSlug))
        .map((row) => row.section_key)
    );

    if (isDiveSiteSlug(selectedPageSlug)) {
      DIVE_SITE_SECTION_ORDER.forEach((key) => keys.add(key));
    }

    return Array.from(keys)
      .filter((sectionKey) => !isHiddenInPageEditor(sectionKey))
      .sort((a, b) => {
      const aIdx = DIVE_SITE_SECTION_ORDER.indexOf(a);
      const bIdx = DIVE_SITE_SECTION_ORDER.indexOf(b);

      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return a.localeCompare(b);
      });
  }, [data, selectedLocale, selectedPageSlug]);

  const groupedPageSectionKeys = useMemo(() => {
    const grouped = new Map<string, string[]>();

    pageSectionKeys.forEach((sectionKey) => {
      const group = getEditorGroup(sectionKey);
      if (!grouped.has(group)) grouped.set(group, []);
      grouped.get(group)!.push(sectionKey);
    });

    return EDITOR_GROUP_ORDER
      .map((group) => ({ group, keys: grouped.get(group) || [] }))
      .filter((entry) => entry.keys.length > 0);
  }, [pageSectionKeys]);

  useEffect(() => {
    if (!selectedPageSlug) {
      setPageDraft({});
      return;
    }

    const nextDraft: Record<string, string> = {};
    pageSectionKeys.forEach((sectionKey) => {
      const localeRow = data.find(
        (item) =>
          matchesSelectedPageSlug(item.page_slug, selectedPageSlug) &&
          item.locale === selectedLocale &&
          item.section_key === sectionKey
      );

      // Keep locale editing strict: do not auto-fill Dutch from English rows.
      nextDraft[sectionKey] = normalizeEditorValue(localeRow?.content_value || '');
    });

    setPageDraft(nextDraft);
  }, [data, pageSectionKeys, selectedLocale, selectedPageSlug]);

  const handleSavePage = async () => {
    if (!selectedPageSlug) {
      alert('Please select a page first.');
      return;
    }

    const adminToken = window.localStorage.getItem('admin_login_token');
    if (!adminToken) {
      alert('Not authenticated. Please login first.');
      return;
    }

    const rowsToUpsert = pageSectionKeys.map((sectionKey) => {
      const existing = data.find(
        (row) =>
          matchesSelectedPageSlug(row.page_slug, selectedPageSlug) &&
          row.locale === selectedLocale &&
          row.section_key === sectionKey
      );

      return {
        // Include id so new rows satisfy the NOT NULL constraint; preserve existing id for updates.
        id: existing?.id || crypto.randomUUID(),
        // Preserve existing slug format when present (legacy short slugs or canonical paths)
        // so updates target existing rows instead of forcing new inserts.
        page_slug: existing?.page_slug || getCanonicalPageSlug(selectedPageSlug),
        section_key: sectionKey,
        locale: selectedLocale,
        content_type: existing?.content_type || 'text',
        content_value: normalizeMediaLikeValue(
          sectionKey,
          existing?.content_type || 'text',
          pageDraft[sectionKey] ?? ''
        ),
      };
    });

    if (rowsToUpsert.length === 0) {
      alert('No section rows found to save for this page.');
      return;
    }

    setSavingPage(true);

    try {
      const response = await fetch(buildApiUrl('/api/admin/page-content'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-login-token': adminToken,
        },
        body: JSON.stringify(rowsToUpsert),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      const savedRows = await response.json();

      if (Array.isArray(savedRows)) {
        const incoming = savedRows as PageContentRow[];
        const incomingIds = new Set(incoming.map((row) => row.id));

        setData((prev) => {
          const kept = prev.filter((row) => !incomingIds.has(row.id));
          const merged = [...kept, ...incoming];
          merged.sort((a, b) => {
          const pageCmp = a.page_slug.localeCompare(b.page_slug);
          if (pageCmp !== 0) return pageCmp;
          const sectionCmp = a.section_key.localeCompare(b.section_key);
          if (sectionCmp !== 0) return sectionCmp;
          return a.locale.localeCompare(b.locale);
        });
        return merged;
      });
      }

      alert(`Saved ${rowsToUpsert.length} sections for ${selectedPageSlug} (${selectedLocale}).`);
    } catch (err) {
      alert('Error saving page: ' + ((err as any).message || String(err)));
    } finally {
      setSavingPage(false);
    }
  };

  const handleEdit = (row: PageContentRow) => {
    setEditingId(row.id);
    setEditContent(normalizeEditorValue(row.content_value));
    setEditContentType(row.content_type || 'text');
  };

  const handleSave = async (row: PageContentRow) => {
    const adminToken = window.localStorage.getItem('admin_login_token');
    if (!adminToken) {
      alert('Not authenticated. Please login first.');
      return;
    }

    try {
      const response = await fetch(buildApiUrl(`/api/admin/page-content?id=${encodeURIComponent(row.id)}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-login-token': adminToken,
        },
        body: JSON.stringify({
          ...row,
          content_value: normalizeMediaLikeValue(
            row.section_key,
            editContentType || row.content_type || 'text',
            editContent
          ),
          content_type: editContentType || row.content_type || 'text',
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      setData((prev) => prev.map((r) => (r.id === row.id ? { ...r, content_value: editContent, content_type: editContentType || r.content_type } : r)));
      setRecentlyEdited((prev) => ({ ...prev, [row.id]: true }));
      setTimeout(() => {
        setRecentlyEdited((prev) => {
          const next = { ...prev };
          delete next[row.id];
          return next;
        });
      }, 2500);
      setEditingId(null);
    } catch (err) {
      alert('Error saving: ' + ((err as any).message || String(err)));
    }
  };

  const handleAddRow = async () => {
    const page_slug = newPageSlug.trim();
    const section_key = newSectionKey.trim();
    const content_value = newContentValue;
    const content_type = (newContentType || 'text').trim() || 'text';

    if (!page_slug || !section_key) {
      alert('Please enter both Page Slug and Section Key.');
      return;
    }

    const adminToken = window.localStorage.getItem('admin_login_token');
    if (!adminToken) {
      alert('Not authenticated. Please login first.');
      return;
    }

    setIsAddingRow(true);

    try {
      const response = await fetch(buildApiUrl('/api/admin/page-content'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-login-token': adminToken,
        },
        body: JSON.stringify({
          page_slug,
          section_key,
          locale: selectedLocale,
          content_value,
          content_type,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      const inserted = await response.json();
      
      setData((prev) => {
        const next = [inserted as PageContentRow, ...prev];
        next.sort((a, b) => {
          const pageCmp = a.page_slug.localeCompare(b.page_slug);
          if (pageCmp !== 0) return pageCmp;
          const sectionCmp = a.section_key.localeCompare(b.section_key);
          if (sectionCmp !== 0) return sectionCmp;
          return a.locale.localeCompare(b.locale);
        });
        return next;
      });
      setRecentlyEdited((prev) => ({ ...prev, [inserted.id]: true }));
      setTimeout(() => {
        setRecentlyEdited((prev) => {
          const next = { ...prev };
          delete next[inserted.id];
          return next;
        });
      }, 2500);
      setNewSectionKey('');
      setNewContentValue('');
    } catch (err) {
      alert('Error adding row: ' + ((err as any).message || String(err)));
    } finally {
      setIsAddingRow(false);
    }
  };

  const toggleQuickFilter = (filter: string) => {
    setQuickFilters((prev) =>
      prev.includes(filter) ? prev.filter((item) => item !== filter) : [...prev, filter]
    );
  };

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return data.filter((row) => {
      const group = getPageGroup(row.page_slug);
      if (groupFilter !== 'all' && group !== groupFilter) return false;

      const selectedLocaleFilters = LOCALE_FILTERS.filter((filter) => quickFilters.includes(filter));
      if (selectedLocaleFilters.length && !selectedLocaleFilters.includes(row.locale as 'en' | 'nl')) {
        return false;
      }

      const selectedContentFilters = CONTENT_FILTERS.filter((filter) => quickFilters.includes(filter));
      if (selectedContentFilters.length) {
        const section = row.section_key.toLowerCase();
        const isHero = section.includes('hero');
        const isPrice = /(price|thb|usd|eur|amount|deposit)/i.test(section);
        const isFaq = /(faq|question|answer)/i.test(section);
        const contentMatch =
          (selectedContentFilters.includes('hero') && isHero) ||
          (selectedContentFilters.includes('prices') && isPrice) ||
          (selectedContentFilters.includes('faq') && isFaq);

        if (!contentMatch) return false;
      }

      if (!q) return true;

      return (
        row.page_slug.toLowerCase().includes(q) ||
        row.section_key.toLowerCase().includes(q) ||
        row.locale.toLowerCase().includes(q) ||
        (row.content_value || '').toLowerCase().includes(q)
      );
    });
  }, [data, groupFilter, quickFilters, searchQuery]);

  const groupedRows = useMemo(() => {
    const grouped = new Map<string, PageContentRow[]>();

    filteredRows.forEach((row) => {
      const group = getPageGroup(row.page_slug);
      if (!grouped.has(group)) grouped.set(group, []);
      grouped.get(group)!.push(row);
    });

    return GROUP_ORDER
      .map((group) => [group, grouped.get(group) || []] as const)
      .filter(([, rows]) => rows.length > 0);
  }, [filteredRows]);

  if (loading) return <div>{t('admin.loading', { defaultValue: 'Loading...' })}</div>;
  if (error) return <div>{t('admin.error', { defaultValue: 'Error' })}: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">{t('admin.pages_manager_title', { defaultValue: 'Pages Manager' })}</h1>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setEditorMode('page')}
          className={`rounded px-3 py-1 text-sm font-semibold ${editorMode === 'page' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          {t('admin.pages_page_editor', { defaultValue: 'Page Editor' })}
        </button>
        <button
          type="button"
          onClick={() => setEditorMode('rows')}
          className={`rounded px-3 py-1 text-sm font-semibold ${editorMode === 'rows' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          {t('admin.pages_row_table', { defaultValue: 'Row Table' })}
        </button>
        <label className="ml-2 inline-flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={useWysiwyg}
            onChange={(e) => setUseWysiwyg(e.target.checked)}
          />
          {t('admin.pages_wysiwyg', { defaultValue: 'WYSIWYG editor' })}
        </label>
      </div>

      {editorMode === 'page' && (
        <div className="mt-4 rounded border border-gray-200 p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">{t('admin.pages_page_label', { defaultValue: 'Page' })}</label>
              <select
                value={selectedPageSlug}
                onChange={(e) => setSelectedPageSlug(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2"
                aria-label="Select page"
              >
                {groupedPageSlugs.map(({ group, slugs }) => (
                  <optgroup key={group} label={`${group} (${slugs.length})`}>
                    {slugs.map((slug) => (
                      <option key={slug} value={slug}>
                        {slug}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">{t('admin.pages_locale_label', { defaultValue: 'Locale' })}</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedLocale('en')}
                  className={`rounded px-3 py-2 text-sm font-semibold ${selectedLocale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLocale('nl')}
                  className={`rounded px-3 py-2 text-sm font-semibold ${selectedLocale === 'nl' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  NL
                </button>
              </div>
            </div>
          </div>

          {selectedPageSlug ? (
            <>
              <div className="mt-4 text-sm text-gray-500">
                Editing <span className="font-semibold text-gray-700">{selectedPageSlug}</span> in <span className="font-semibold text-gray-700">{selectedLocale}</span>.
              </div>

              {selectedLocale === 'nl' && (
                <div className="mt-2 mb-4">
                  <button
                    type="button"
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => {
                      const nextDraft = { ...pageDraft };
                      pageSectionKeys.forEach((sectionKey) => {
                        const enRow = data.find(
                          (item) =>
                            matchesSelectedPageSlug(item.page_slug, selectedPageSlug) &&
                            item.locale === 'en' &&
                            item.section_key === sectionKey
                        );
                        if (enRow) {
                          nextDraft[sectionKey] = normalizeEditorValue(enRow.content_value || '');
                        }
                      });
                      setPageDraft(nextDraft);
                    }}
                  >
                    {t('admin.pages_copy_english_to_dutch', { defaultValue: 'Copy all English content to Dutch' })}
                  </button>
                </div>
              )}

              <div className="mt-3 space-y-4">
                {groupedPageSectionKeys.map(({ group, keys }) => (
                  <div key={group} className="rounded border border-gray-200 p-3">
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
                      {group} ({keys.length})
                    </h3>
                    <div className="space-y-3">
                      {keys.map((sectionKey) => (
                        <div key={sectionKey}>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            {toSectionLabel(sectionKey)}
                            <span className="ml-2 text-xs text-gray-400">({sectionKey})</span>
                          </label>
                          {useWysiwyg && !shouldForcePlainTextEditor(sectionKey) ? (
                            <RichTextEditor
                              value={pageDraft[sectionKey] || ''}
                              onChange={(val) =>
                                setPageDraft((prev) => ({
                                  ...prev,
                                  [sectionKey]: val,
                                }))
                              }
                              placeholder={`Edit ${sectionKey}`}
                            />
                          ) : (
                            <textarea
                              value={pageDraft[sectionKey] || ''}
                              onChange={(e) =>
                                setPageDraft((prev) => ({
                                  ...prev,
                                  [sectionKey]: e.target.value,
                                }))
                              }
                              rows={sectionKey === 'overview' ? 5 : 3}
                              className="w-full rounded border border-gray-300 p-2"
                              placeholder={`Edit ${sectionKey}`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleSavePage}
                  disabled={savingPage || pageSectionKeys.length === 0}
                  className="rounded bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {savingPage ? t('admin.saving', { defaultValue: 'Saving...' }) : t('admin.pages_save_sections', { defaultValue: 'Save {{count}} Sections', count: pageSectionKeys.length }).replace('{{count}}', String(pageSectionKeys.length))}
                </button>
              </div>
            </>
          ) : (
            <div className="mt-4 text-sm text-gray-500">{t('admin.pages_no_pages', { defaultValue: 'No pages found in page_content yet.' })}</div>
          )}
        </div>
      )}

      {editorMode === 'rows' && (
        <>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('admin.pages_search_placeholder', { defaultValue: 'Search page, section, locale, or content' })}
          className="min-w-[280px] flex-1 rounded border border-gray-300 px-3 py-2"
          aria-label="Search page rows"
        />

        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2"
          aria-label="Filter by section"
        >
          <option value="all">{t('admin.pages_all_sections', { defaultValue: 'All Sections' })}</option>
          {GROUP_ORDER.map((group) => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>

        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={showIds} onChange={(e) => setShowIds(e.target.checked)} />
          Show UUID
        </label>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {[
          { key: 'en', label: 'EN' },
          { key: 'nl', label: 'NL' },
          { key: 'hero', label: 'hero_title' },
          { key: 'prices', label: 'prices' },
          { key: 'faq', label: 'FAQ' },
        ].map((chip) => {
          const active = quickFilters.includes(chip.key);
          return (
            <button
              key={chip.key}
              type="button"
              onClick={() => toggleQuickFilter(chip.key)}
              className={`rounded-full border px-3 py-1 text-xs ${active ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-600'}`}
            >
              {chip.label}
            </button>
          );
        })}
        {quickFilters.length > 0 && (
          <button
            type="button"
            onClick={() => setQuickFilters([])}
            className="rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-600"
          >
            Clear chips
          </button>
        )}
      </div>

      <div className="mt-3 rounded border border-gray-200 p-3">
        <div className="mb-2 text-sm font-semibold">Add Missing Row</div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
          <input
            value={newPageSlug}
            onChange={(e) => setNewPageSlug(e.target.value)}
            placeholder="page slug (e.g. accommodation)"
            className="rounded border border-gray-300 px-3 py-2"
            aria-label="New row page slug"
          />
          <input
            value={newSectionKey}
            onChange={(e) => setNewSectionKey(e.target.value)}
            placeholder="section key (e.g. heroTitle)"
            className="rounded border border-gray-300 px-3 py-2"
            aria-label="New row section key"
          />
          <select
            value={newLocale}
            onChange={(e) => setNewLocale(e.target.value as 'en' | 'nl')}
            className="rounded border border-gray-300 px-3 py-2"
            aria-label="New row locale"
          >
            <option value="en">en</option>
            <option value="nl">nl</option>
          </select>
          <input
            value={newContentType}
            onChange={(e) => setNewContentType(e.target.value)}
            placeholder="content type (text)"
            className="rounded border border-gray-300 px-3 py-2"
            aria-label="New row content type"
          />
          <button
            type="button"
            onClick={handleAddRow}
            className="rounded border border-gray-300 px-3 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isAddingRow}
          >
            {isAddingRow ? 'Adding...' : 'Add Row'}
          </button>
        </div>
        <textarea
          value={newContentValue}
          onChange={(e) => setNewContentValue(e.target.value)}
          placeholder="content value"
          className="mt-2 w-full rounded border border-gray-300 p-2"
          rows={3}
          aria-label="New row content value"
        />
      </div>

      <div className="mt-2 max-h-[70vh] overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="sticky top-0 z-20 bg-white">
            <th className="border border-gray-300 p-2 text-left">Actions</th>
            <th className="border border-gray-300 p-2 text-left">Page</th>
            <th className="border border-gray-300 p-2 text-left">Section Key</th>
            <th className="border border-gray-300 p-2 text-left">Locale</th>
            <th className="border border-gray-300 p-2 text-left">Type</th>
            <th className="border border-gray-300 p-2 text-left">Content</th>
            {showIds && <th className="border border-gray-300 p-2 text-left">ID</th>}
          </tr>
        </thead>
        <tbody>
          {groupedRows.map(([group, rows]) => (
            <React.Fragment key={group}>
              <tr className="bg-gray-100">
                <td colSpan={showIds ? 7 : 6} className="sticky top-9 z-10 border border-gray-300 bg-gray-100 p-2 font-semibold">
                  {group} ({rows.length})
                </td>
              </tr>
              {rows.map((row) => (
            <tr key={row.id} className={recentlyEdited[row.id] ? 'bg-emerald-50' : ''}>
              <td className="whitespace-nowrap border border-gray-300 p-2">
                {editingId === row.id ? (
                  <div className="flex flex-col gap-1">
                    <button
                      className="rounded bg-green-600 px-3 py-1 text-sm font-semibold text-white hover:bg-green-700"
                      onClick={() => handleSave(row)}
                    >
                      Save
                    </button>
                    <button
                      className="rounded bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-300"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="rounded bg-blue-600 px-3 py-1 text-sm font-semibold text-white hover:bg-blue-700"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </button>
                )}
                {recentlyEdited[row.id] && <span className="ml-1 block text-xs text-emerald-700">Saved ✓</span>}
              </td>
              <td className="border border-gray-300 p-2">{row.page_slug}</td>
              <td className="border border-gray-300 p-2">{row.section_key}</td>
              <td className="border border-gray-300 p-2">{row.locale}</td>
              <td className="border border-gray-300 p-2">
                {editingId === row.id ? (
                  <input
                    value={editContentType}
                    onChange={(e) => setEditContentType(e.target.value)}
                    className="w-full rounded border border-gray-300 p-1 text-sm"
                    placeholder="text"
                  />
                ) : (
                  row.content_type || 'text'
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingId === row.id ? (
                  useWysiwyg && !shouldForcePlainTextEditor(row.section_key, row.content_type) ? (
                    <RichTextEditor
                      value={editContent}
                      onChange={setEditContent}
                      placeholder="Edit content"
                    />
                  ) : (
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={3}
                      className="w-full rounded border border-gray-300 p-2"
                      aria-label={`Edit content for ${row.page_slug} ${row.section_key} ${row.locale}`}
                      placeholder="Edit content"
                    />
                  )
                ) : (
                  row.content_value
                )}
              </td>
              {showIds && <td className="border border-gray-300 p-2 text-xs text-muted-foreground">{row.id}</td>}
            </tr>
          ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {groupedRows.length === 0 && (
        <div className="py-6 text-sm text-gray-500">No rows match your current filters.</div>
      )}
      </div>
      </>
      )}
    </div>
  );
};

export default AdminPagesManager;
