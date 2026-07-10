import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface FacebookPhoto {
  id: string;
  source: string;
  picture?: string;
  created_time?: string;
}

declare global {
  interface Window {
    FB?: any;
  }
}

const FacebookFeed = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const [photos, setPhotos] = useState<FacebookPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // Using public Facebook page photos - replace PAGE_ID with actual ID
        const pageId = '61553713498498'; // Your Facebook page ID from the URL
        const accessToken = 'YOUR_FACEBOOK_SDK_KEY'; // Public access for page photos
        
        const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&access_token=${accessToken}`;
        
        // For now, using a simpler approach with embedded iFrame showing latest posts
        setLoading(false);
        
        // Alternative: If you have API access, fetch photos here
        // const response = await fetch(url);
        // const data = await response.json();
        // setPhotos(data.data || []);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setLoading(false);
      }
    };

    // Comment out the API call for now - we'll use the embedded approach below
    // fetchPhotos();
    setLoading(false);
    
    // Load Facebook SDK
    if (!window.FB) {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
      document.body.appendChild(script);
    }
  }, []);

  const content = isDutch ? {
    title: 'Bekijk onze foto\'s',
    subtitle: 'De mooiste momenten van onze duikavonturen',
  } : {
    title: 'View Our Photos',
    subtitle: 'The most beautiful moments from our diving adventures',
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{content.title}</h2>
          <p className="text-lg text-gray-300">{content.subtitle}</p>
        </div>

        {/* Instagram Feed Embed (connects to your social media) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Facebook Page */}
          <div className="flex justify-center">
            <div
              className="fb-page"
              data-href="https://www.facebook.com/divegoprobybas/"
              data-tabs="timeline"
              data-width="500"
              data-height="600"
              data-small-header="false"
              data-adapt-container-width="true"
              data-hide-cover="false"
              data-show-facepile="true"
            >
              <blockquote
                cite="https://www.facebook.com/divegoprobybas/"
                className="fb-xfbml-parse-ignore"
              >
                <a href="https://www.facebook.com/divegoprobybas/">
                  Dive Go Pro by Bas
                </a>
              </blockquote>
            </div>
          </div>

          {/* Right: Instagram Feed */}
          <div className="flex justify-center">
            <div
              className="instagram-feed"
              style={{
                width: '100%',
                maxWidth: '500px',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <iframe
                src="https://www.instagram.com/pro_diving_asia/embed"
                width="100%"
                height="600"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
                allow="encrypted-media"
                style={{ borderRadius: '8px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacebookFeed;
