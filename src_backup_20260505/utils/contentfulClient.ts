import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function fetchEntries(contentType: string) {
  try {
    const entries = await client.getEntries({ content_type: contentType });
    return entries.items;
  } catch (error) {
    console.error('Contentful fetch error:', error);
    return [];
  }
}

// Example usage:
// (async () => {
//   const posts = await fetchEntries('blogPost');
//   console.log(posts);
// })();
