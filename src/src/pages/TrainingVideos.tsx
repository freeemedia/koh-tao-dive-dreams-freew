import { useEffect, useState } from 'react';

interface TrainingVideo {
  id: string;
  title: string;
  description?: string;
}

const API_URL = 'https://api.divinginasia.com/training-videos';

/**
 * Extract a YouTube video ID from a URL or a bare ID string.
 * Supports watch?v=, youtu.be/, /embed/ and raw 11-char IDs.
 */
function extractYouTubeId(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  const raw = value.trim();

  // Already looks like a bare 11-char ID
  if (/^[A-Za-z0-9_-]{11}$/.test(raw)) return raw;

  try {
    const url = new URL(raw);
    const vParam = url.searchParams.get('v');
    if (vParam) return vParam;

    const parts = url.pathname.split('/').filter(Boolean);
    const last = parts[parts.length - 1];
    if (last && /^[A-Za-z0-9_-]{11}$/.test(last)) return last;
  } catch {
    // Not a URL, fall through
  }

  return null;
}

/**
 * Normalize an unknown API item into a TrainingVideo, tolerating
 * several likely field names for the YouTube reference.
 */
function normalizeVideo(item: unknown, index: number): TrainingVideo | null {
  if (!item || typeof item !== 'object') return null;
  const record = item as Record<string, unknown>;

  const id =
    extractYouTubeId(record.youtubeUrl) ||
    extractYouTubeId(record.url) ||
    extractYouTubeId(record.youtubeId) ||
    extractYouTubeId(record.videoId) ||
    extractYouTubeId(record.id);

  if (!id) return null;

  return {
    id,
    title:
      typeof record.title === 'string' && record.title.trim()
        ? record.title
        : `Training video ${index + 1}`,
    description:
      typeof record.description === 'string' ? record.description : undefined,
  };
}

export default function TrainingVideos() {
  const [videos, setVideos] = useState<TrainingVideo[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const response = await fetch(API_URL, { method: 'GET' });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);

        const data = await response.json();
        const list = Array.isArray(data)
          ? data
          : Array.isArray((data as Record<string, unknown>)?.videos)
            ? ((data as Record<string, unknown>).videos as unknown[])
            : [];

        const normalized = list
          .map((item, index) => normalizeVideo(item, index))
          .filter((video): video is TrainingVideo => video !== null);

        if (!isMounted) return;
        setVideos(normalized);
        setStatus('ready');
      } catch (err) {
        console.warn('Failed to load training videos:', err);
        if (!isMounted) return;
        setStatus('error');
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Training Videos</h1>

      {status === 'loading' && (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}

      {status === 'error' && (
        <p className="text-red-600">
          Unable to load training videos right now. Please try again later.
        </p>
      )}

      {status === 'ready' && videos.length === 0 && (
        <p className="text-muted-foreground">No training videos available yet.</p>
      )}

      {status === 'ready' && videos.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2">
          {videos.map((video) => (
            <div key={video.id} className="space-y-3">
              <div className="aspect-video w-full overflow-hidden rounded-lg shadow">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h2 className="text-lg font-semibold">{video.title}</h2>
              {video.description && (
                <p className="text-sm text-muted-foreground">{video.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
