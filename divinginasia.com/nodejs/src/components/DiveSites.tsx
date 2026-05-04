import React from 'react';
import { Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const DiveSites = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const sites = [
    {
      name: t('diveSites.sites.sailRock.name'),
      depth: t('diveSites.sites.sailRock.depth'),
      level: t('diveSites.sites.sailRock.level'),
      highlights: t('diveSites.sites.sailRock.highlights', { returnObjects: true }),
      description: t('diveSites.sites.sailRock.description'),
      image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: t('diveSites.sites.chumphon.name'),
      depth: t('diveSites.sites.chumphon.depth'),
      level: t('diveSites.sites.chumphon.level'),
      highlights: t('diveSites.sites.chumphon.highlights', { returnObjects: true }),
      description: t('diveSites.sites.chumphon.description'),
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: t('diveSites.sites.southwest.name'),
      depth: t('diveSites.sites.southwest.depth'),
      level: t('diveSites.sites.southwest.level'),
      highlights: t('diveSites.sites.southwest.highlights', { returnObjects: true }),
      description: t('diveSites.sites.southwest.description'),
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: t('diveSites.sites.sharkIsland.name'),
      depth: t('diveSites.sites.sharkIsland.depth'),
      level: t('diveSites.sites.sharkIsland.level'),
      highlights: t('diveSites.sites.sharkIsland.highlights', { returnObjects: true }),
      description: t('diveSites.sites.sharkIsland.description'),
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: t('diveSites.sites.whiteRock.name'),
      depth: t('diveSites.sites.whiteRock.depth'),
      level: t('diveSites.sites.whiteRock.level'),
      highlights: t('diveSites.sites.whiteRock.highlights', { returnObjects: true }),
      description: t('diveSites.sites.whiteRock.description'),
      image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: t('diveSites.sites.greenRock.name'),
      depth: t('diveSites.sites.greenRock.depth'),
      level: t('diveSites.sites.greenRock.level'),
      highlights: t('diveSites.sites.greenRock.highlights', { returnObjects: true }),
      description: t('diveSites.sites.greenRock.description'),
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const getLevelColor = (level: string) => {
    const levelColors: { [key: string]: string } = {
      [t('diveSites.sites.sailRock.level')]: 'bg-red-100 text-red-800',
      [t('diveSites.sites.chumphon.level')]: 'bg-yellow-100 text-yellow-800',
      [t('diveSites.sites.southwest.level')]: 'bg-yellow-100 text-yellow-800',
      [t('diveSites.sites.sharkIsland.level')]: 'bg-green-100 text-green-800',
      [t('diveSites.sites.whiteRock.level')]: 'bg-green-100 text-green-800',
      [t('diveSites.sites.greenRock.level')]: 'bg-green-100 text-green-800',
    };
    return levelColors[level] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section id="dive-sites" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('diveSites.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('diveSites.subtitle')}
          </p>
        </div>

        <div className="mb-8">
          {/* small gallery row for dive sites */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <img src="/images/photo-1682686580849-3e7f67df4015.avif" alt="site-1" className="w-full h-40 md:h-48 object-cover rounded" />
            <img src="/images/photo-1618865181016-a80ad83a06d3.avif" alt="site-2" className="w-full h-40 md:h-48 object-cover rounded" />
            <img src="/images/photo-1647825194145-2d94e259c745.avif" alt="site-3" className="w-full h-40 md:h-48 object-cover rounded" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sites.map((site, index) => (
            <div key={index} id={`site-${['sailRock','chumphon','southwest','sharkIsland','whiteRock','greenRock'][index]}`} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 scroll-mt-20">
              <div className="relative h-48">
                <img
                  src={site.image}
                  alt={site.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(site.level)}`}>
                    {site.level}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{site.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{site.description}</p>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Eye className="h-4 w-4 mr-1" />
                  <span className="mr-4">{t('diveSites.depth')}: {site.depth}</span>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">{t('diveSites.highlights')}:</p>
                  <div className="flex flex-wrap gap-1">
                    {(site.highlights as string[]).map((highlight: string, idx: number) => (
                      <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/booking?item=${encodeURIComponent(site.name)}&type=dive`)}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  {t('diveSites.bookButton')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default DiveSites;
