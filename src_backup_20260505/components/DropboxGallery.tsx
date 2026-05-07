import React, { useEffect, useState } from 'react';

const toFriendlyGalleryError = (value: unknown) => {
  if (typeof value !== 'string' || !value.trim()) {
    return 'Gallery unavailable right now.';
  }

  const normalized = value.toLowerCase();

  if (
    normalized.includes('missing_scope') ||
    normalized.includes('path/not_found') ||
    normalized.includes('expired_access_token') ||
    normalized.includes('missing dropbox access token') ||
    normalized.includes('dropbox is not configured')
  ) {
    return 'Gallery unavailable right now.';
  }

  return 'Failed to load gallery.';
};

interface DropboxGalleryProps {
  folder: string; // e.g. "japanese-gardens" or "open-water-course"
  unavailableMessage?: string;
  emptyMessage?: string;
}

const DropboxGallery: React.FC<DropboxGalleryProps> = ({
  folder,
  unavailableMessage = 'Gallery unavailable right now.',
  emptyMessage = 'No images found for this section.',
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/dropbox-gallery?folder=${encodeURIComponent(folder)}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setImages(data);
          setLoading(false);
          return;
        }

        setImages([]);
        const friendlyError = toFriendlyGalleryError(data?.error);
        setError(friendlyError === 'Gallery unavailable right now.' ? unavailableMessage : friendlyError);
        setLoading(false);
      })
      .catch(err => {
        setError(unavailableMessage);
        setLoading(false);
      });
  }, [folder]);

  if (loading) return <div>Loading gallery...</div>;
  if (error) return <div className="text-sm text-muted-foreground">{error}</div>;
  if (!images.length) return <div>{emptyMessage}</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-8">
      {images.map((url, idx) => (
        <div key={idx} className="aspect-w-1 aspect-h-1 bg-gray-100 rounded overflow-hidden shadow">
          <img src={url} alt="Gallery" className="object-cover w-full h-full" loading="lazy" />
        </div>
      ))}
    </div>
  );
};

export default DropboxGallery;
