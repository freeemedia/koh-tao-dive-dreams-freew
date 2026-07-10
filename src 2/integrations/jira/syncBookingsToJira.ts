// Jira sync utility: creates issues for bookings in CSV
// Usage: import and call syncBookingsToJira()

import fs from 'fs';
import path from 'path';
import { buildJiraIssuePayload, createJiraIssue, isJiraConfigured } from '../../../api/_lib/jira.js';

// ES module compatible __dirname
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BOOKINGS_CSV = path.join(__dirname, '../../../bookings_export.csv');

function parseCSV(csv) {
  const [header, ...lines] = csv.trim().split('\n');
  const keys = header.split(',');
  return lines.map(line => {
    // Handle quoted fields and commas
    const values = line.match(/("[^"]*"|[^,]+)/g).map(v => v.replace(/^"|"$/g, ''));
    const obj = {};
    keys.forEach((k, i) => { obj[k] = values[i] || ''; });
    return obj;
  });
}

async function createJiraIssue(booking) {
  const summary = `[Booking] ${booking.course_title} for ${booking.name}`;
  const description = `Booking Details:\n\nName: ${booking.name}\nEmail: ${booking.email}\nPhone: ${booking.phone}\nCourse: ${booking.course_title}\nPreferred Date: ${booking.preferred_date}\nExperience Level: ${booking.experience_level}\nMessage: ${booking.message}\nStatus: ${booking.status}\nCreated At: ${booking.created_at}`;
  return createJiraIssue(buildJiraIssuePayload({
    summary,
    description,
    labels: ['booking'],
    extraFields: {
      duedate: booking.preferred_date || undefined,
    },
  }));
}

export async function syncBookingsToJira() {
  if (!isJiraConfigured()) {
    throw new Error('Jira credentials are not configured');
  }

  const csv = fs.readFileSync(BOOKINGS_CSV, 'utf8');
  const bookings = parseCSV(csv);
  for (const booking of bookings) {
    if (['confirmed', 'pending'].includes(booking.status)) {
      try {
        await createJiraIssue(booking);
        console.log(`Synced booking for ${booking.name} (${booking.preferred_date})`);
      } catch (err) {
        console.error(`Failed to sync booking for ${booking.name}:`, err.message);
      }
    }
  }
}
