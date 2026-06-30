// split-csv-by-page-slug.js
// Usage: node split-csv-by-page-slug.js
// This script splits supabase-export.csv into separate files by unique Page Slug

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const INPUT_FILE = 'supabase-export.csv';
const OUTPUT_DIR = '.'; // Current directory
const COLUMN_NAME = 'Page Slug';

async function splitCSVByColumn() {
  const inputStream = fs.createReadStream(INPUT_FILE);
  const rl = readline.createInterface({ input: inputStream });

  let header;
  let columnIdx;
  const writers = {};

  for await (const line of rl) {
    if (!header) {
      header = line;
      const columns = header.split(',');
      columnIdx = columns.indexOf(COLUMN_NAME);
      if (columnIdx === -1) {
        console.error(`Column '${COLUMN_NAME}' not found.`);
        process.exit(1);
      }
      continue;
    }
    const fields = line.split(',');
    const slug = fields[columnIdx].replace(/[^a-zA-Z0-9-_]/g, '_');
    if (!writers[slug]) {
      writers[slug] = fs.createWriteStream(path.join(OUTPUT_DIR, `${slug}.csv`));
      writers[slug].write(header + '\n');
    }
    writers[slug].write(line + '\n');
  }

  // Close all writers
  for (const w of Object.values(writers)) {
    w.end();
  }
  console.log('CSV split complete.');
}

splitCSVByColumn().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
