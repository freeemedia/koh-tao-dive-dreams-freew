// import-dive-sites-to-contentful.js
// Usage: node import-dive-sites-to-contentful.js
// Requires: npm install contentful-management

const contentful = require('contentful-management');
const fs = require('fs');

// CONFIGURE THESE
const SPACE_ID = 'tir2z79k6zhh';
const ACCESS_TOKEN = 'OUbFbvf7D_ncFJuYAbDAwXT_MXtt_kxdTbre9cN2nL0';
const ENVIRONMENT_ID = 'master'; // Change if you use a different environment
const CONTENT_TYPE_ID = 'destination'; // Change if your content type ID is different
const DIVE_SITES_FILE = './dive-sites.json'; // Path to your JSON file

async function main() {
  const client = contentful.createClient({
    accessToken: ACCESS_TOKEN,
  });

  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);

  const diveSites = JSON.parse(fs.readFileSync(DIVE_SITES_FILE, 'utf8'));

  for (const site of diveSites) {
    try {
      const entry = await environment.createEntry(CONTENT_TYPE_ID, {
        fields: {
          // Map your fields here. Example:
          destination: { 'en-US': site.destination },
          description: { 'en-US': site.description },
          featuredImage: { 'en-US': site.featuredImage || null },
          bestDiveSites: { 'en-US': site.bestDiveSites || '' },
          divePackages: { 'en-US': site.divePackages || '' },
          reviews: { 'en-US': site.reviews || [] },
          contactInfo: { 'en-US': site.contactInfo || {} },
        },
      });
      console.log(`Imported: ${site.destination}`);
    } catch (err) {
      console.error(`Error importing ${site.destination}:`, err.message);
    }
  }
}

main().catch(console.error);
