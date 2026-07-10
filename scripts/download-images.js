// Node.js script to download all images from a given archived web page (Wayback Machine)
// Usage: node download-images.js <archived_page_url> <output_folder>

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

async function downloadImage(url, outputDir) {
  const filename = path.basename(new URL(url).pathname);
  const filepath = path.join(outputDir, filename);
  try {
    const response = await axios({ url, responseType: 'stream' });
    await new Promise((resolve, reject) => {
      const stream = response.data.pipe(fs.createWriteStream(filepath));
      stream.on('finish', resolve);
      stream.on('error', reject);
    });
    console.log(`Downloaded: ${filename}`);
  } catch (err) {
    console.error(`Failed to download ${url}: ${err.message}`);
  }
}

async function main() {
  const [,, pageUrl, outputDir = 'downloaded_images'] = process.argv;
  if (!pageUrl) {
    console.error('Usage: node download-images.js <archived_page_url> <output_folder>');
    process.exit(1);
  }
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  try {
    const { data: html } = await axios.get(pageUrl);
    const $ = cheerio.load(html);
    const imgUrls = [];
    $('img').each((_, img) => {
      let src = $(img).attr('src');
      if (src && !src.startsWith('data:')) {
        // Handle relative URLs
        if (!src.startsWith('http')) {
          // Prepend Wayback Machine prefix if needed
          if (src.startsWith('/web/')) {
            src = 'https://web.archive.org' + src;
          } else {
            const base = new URL(pageUrl);
            src = base.origin + src;
          }
        }
        imgUrls.push(src);
      }
    });
    if (imgUrls.length === 0) {
      console.log('No images found.');
      return;
    }
    console.log(`Found ${imgUrls.length} images. Downloading...`);
    for (const imgUrl of imgUrls) {
      await downloadImage(imgUrl, outputDir);
    }
    console.log('All images downloaded.');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
