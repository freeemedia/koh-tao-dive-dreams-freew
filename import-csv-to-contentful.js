// import-csv-to-contentful.js
// Usage: node import-csv-to-contentful.js
// Requires: npm install contentful-management csv-parse

const contentful = require('contentful-management');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

// CONFIGURE THESE
const SPACE_ID = 'tir2z79k6zhh';
const ACCESS_TOKEN = 'OUbFbvf7D_ncFJuYAbDAwXT_MXtt_kxdTbre9cN2nL0';
const ENVIRONMENT_ID = 'master'; // Change if you use a different environment
const CONTENT_TYPE_ID = 'destination'; // Change if your content type ID is different
const CSV_FILE = './supabase-export.csv'; // Path to your CSV file

async function main() {
  const client = contentful.createClient({
    accessToken: ACCESS_TOKEN,
  });

  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);

  const csvData = fs.readFileSync(CSV_FILE, 'utf8');
  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
  });

  for (const row of records) {
    try {
      const entry = await environment.createEntry(CONTENT_TYPE_ID, {
        fields: {
          // Map your CSV columns to Contentful fields here
          destination: { 'en-US': row.destination },
          description: { 'en-US': row.description },
          featuredImage: { 'en-US': row.featuredImage || null },
          bestDiveSites: { 'en-US': row.bestDiveSites || '' },
          divePackages: { 'en-US': row.divePackages || '' },
          reviews: { 'en-US': row.reviews ? JSON.parse(row.reviews) : [] },
          contactInfo: { 'en-US': row.contactInfo ? JSON.parse(row.contactInfo) : {} },
        },
      });
      console.log(`Imported: ${row.destination}`);
    } catch (err) {
      console.error(`Error importing ${row.destination}:`, err.message);
    }
  }
}

main().catch(console.error);
