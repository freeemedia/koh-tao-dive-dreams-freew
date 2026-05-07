import React, { useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';

const DEFAULT_DROPBOX_FOLDER = 'diving_in_asia';

const DiveSiteGallery = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/dropbox/list?folder=${encodeURIComponent(DEFAULT_DROPBOX_FOLDER)}`)
      .then((res) => res.json())
      .then((data) => {
        setFiles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading gallery...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!files.length) return <div>No files found.</div>;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 900, height: '80vh', background: '#fff', border: '2px solid #e5e7eb', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <HTMLFlipBook
          width={700}
          height={window.innerHeight * 0.7}
          size="stretch"
          minWidth={320}
          minHeight={400}
          maxWidth={900}
          maxHeight={1200}
          showCover={true}
          style={{ width: '100%', height: '100%' }}
        >
          {files.map((file, idx) => (
            <div
              key={file.id || file.name || idx}
              className="page"
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                overflow: 'hidden',
              }}
            >
              {/* If file is an image, show it. Otherwise, show file name. */}
              {file.name && file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                <img
                  src={`/api/dropbox/file?path=${encodeURIComponent(file.path_display)}`}
                  alt={file.name}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', background: '#fff' }}
                />
              ) : (
                <span>{file.name}</span>
              )}
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default DiveSiteGallery;
