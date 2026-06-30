#!/usr/bin/env node
/**
 * Migrates page_content_rows.csv (Supabase export) → WordPress MySQL
 * via the KTD plugin REST endpoint: POST /wp-json/ktd/v1/page-content/import
 *
 * Usage:
 *   node scripts/migrate-supabase-content-to-wp.cjs
 *
 * Set WP_URL and WP_API_KEY below, or pass as env vars:
 *   WP_URL=https://yoursite.com WP_API_KEY=your-key node ...
 */

const fs   = require('fs');
const path = require('path');

const WP_URL    = process.env.WP_URL    || 'https://lightsalmon-dinosaur-377714.hostingersite.com';
const WP_API_KEY = process.env.WP_API_KEY || '909010232893284934783734';
const CSV_FILE  = path.join(__dirname, '..', 'page_content_rows.csv');
const BATCH_SIZE = 100;

function parseCSV(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split('\n').filter(l => l.trim());
  const headers = parseCSVLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < headers.length) continue;
    const row = {};
    headers.forEach((h, idx) => { row[h.trim()] = values[idx] ?? ''; });
    rows.push(row);
  }
  return rows;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

async function postBatch(rows) {
  const resp = await fetch(`${WP_URL}/wp-json/ktd/v1/page-content/import`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-ktd-api-key': WP_API_KEY,
    },
    body: JSON.stringify(rows),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`HTTP ${resp.status}: ${text}`);
  }
  return resp.json();
}

async function main() {
  console.log(`Reading ${CSV_FILE}...`);
  const rows = parseCSV(CSV_FILE);
  console.log(`Loaded ${rows.length} rows. Sending in batches of ${BATCH_SIZE}...`);

  let totalInserted = 0;
  let totalSkipped  = 0;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    process.stdout.write(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(rows.length / BATCH_SIZE)}... `);
    try {
      const result = await postBatch(batch);
      totalInserted += result.inserted || 0;
      totalSkipped  += result.skipped  || 0;
      console.log(`inserted: ${result.inserted}, skipped: ${result.skipped}`);
    } catch (err) {
      console.error(`FAILED: ${err.message}`);
      process.exit(1);
    }
  }

  console.log(`\nMigration complete. Total inserted: ${totalInserted}, skipped: ${totalSkipped}`);
}

main();
