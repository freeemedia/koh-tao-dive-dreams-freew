// Script: createJiraIssueFromUrl.js
// Description: Fetches content from a URL and creates a Jira issue with that content as the description.
// Usage: node createJiraIssueFromUrl.js


import fetch from 'node-fetch';
import { buildJiraIssuePayload, createJiraIssue, isJiraConfigured } from './api/_lib/jira.js';


const TARGET_URL = process.argv[2] || process.env.TARGET_URL || 'https://www.divinginasia.com/courses/open-water';


async function fetchPageContent(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch page: ${res.status}`);
  const html = await res.text();
  // Simple extraction: get <body> content only
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1] : html;
}


async function createJiraIssue(htmlContent) {
  const summary = `Imported: ${TARGET_URL}`;
  // Use raw HTML as the description (Jira will store it as-is, but may not render all tags)
  const description = `Imported content from https://www.divinginasia.com/courses/open-water:\n\n<pre>${htmlContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`;
  return createJiraIssue(buildJiraIssuePayload({
    summary,
    description,
    labels: ['imported', 'webpage', 'html'],
  }));
}


// Run main logic
const main = async () => {
  try {
    if (!isJiraConfigured()) {
      throw new Error('Jira credentials are not configured. Set JIRA_EMAIL or JIRA_USER_EMAIL and JIRA_API_TOKEN.');
    }

    const htmlContent = await fetchPageContent(TARGET_URL);
    const result = await createJiraIssue(htmlContent);
    console.log('Jira issue created:', result.key);
  } catch (e) {
    console.error('Error:', e.message || e);
  }
};

main();
