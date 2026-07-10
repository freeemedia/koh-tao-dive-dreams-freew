import React, { useEffect, useState } from 'react';
import { fetchWordPressPage, WordPressPage } from '@/utils/fetchWordPressPage';

interface WordPressPageDisplayProps {
  slug: string;
  fallbackContent?: React.ReactNode;
  className?: string;
}

export const WordPressPageDisplay: React.FC<WordPressPageDisplayProps> = ({
  slug,
  fallbackContent,
  className = '',
}) => {
  const [page, setPage] = useState<WordPressPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPage = async () => {
      try {
        setLoading(true);
        const fetchedPage = await fetchWordPressPage(slug);
        if (!fetchedPage) {
          setError(`Page "${slug}" not found in WordPress`);
        } else {
          setPage(fetchedPage);
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [slug]);

  if (loading) {
    return <div className={`${className} p-8 text-center`}>Loading...</div>;
  }

  if (error || !page) {
    if (fallbackContent) {
      return <>{fallbackContent}</>;
    }
    return (
      <div className={`${className} p-8 text-center text-red-600`}>
        {error || 'Page not found'}
      </div>
    );
  }

  return (
    <div className={`${className} prose max-w-none`}>
      {page.title?.rendered && <h1>{page.title.rendered}</h1>}
      <div dangerouslySetInnerHTML={{ __html: page.content?.rendered || '' }} />
    </div>
  );
};

export default WordPressPageDisplay;
