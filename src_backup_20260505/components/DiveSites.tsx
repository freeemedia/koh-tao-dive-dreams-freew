

import React from 'react';
import { useTranslation } from 'react-i18next';
// import diveSitesData from '../data/dive-sites.json'; // Not used for translation-based rendering


const DiveSites = () => {
	const { t, i18n } = useTranslation();
	// Use translation files for site data
	const sites = t('diveSites.sites', { returnObjects: true });

	return (
		<section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-emerald-50">
			<div className="max-w-5xl mx-auto">
				<h2 className="text-3xl font-bold mb-2 text-center text-blue-900">{t('diveSites.title')}</h2>
				<div className="text-lg text-center text-blue-800 mb-8">{t('diveSites.subtitle')}</div>
				<div className="grid gap-8 md:grid-cols-2">
					{Object.entries(sites).map(([key, site]: [string, any]) => (
						<div key={key} className="rounded-xl shadow-lg bg-white p-6 flex flex-col md:flex-row gap-6 items-start hover:shadow-2xl transition">
							{site.images && site.images.length > 0 && (
								<img
									src={site.images[0]}
									alt={site.name}
									className="w-full md:w-48 h-40 object-cover rounded-lg border border-blue-100"
									loading="lazy"
								/>
							)}
							<div className="flex-1">
								<h3 className="text-xl font-semibold text-emerald-700 mb-2">{site.name}</h3>
								<p className="text-gray-700 mb-3">{site.description}</p>
								<ul className="text-sm text-gray-600 mb-2 space-y-1">
									<li><strong>{t('diveSites.depth', 'Depth')}:</strong> {site.depth}</li>
									<li><strong>{t('diveSites.level', 'Level')}:</strong> {site.level}</li>
									{site.highlights && (
										<li><strong>{t('diveSites.highlights', 'Highlights')}:</strong> {site.highlights.join(', ')}</li>
									)}
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default DiveSites;
