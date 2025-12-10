import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL for the site
const BASE_URL = 'https://sempermade.com';

// Static public routes (no authentication required)
const staticRoutes = [
  '/',
  '/about',
  '/expertise', 
  '/team',
  '/careers',
  '/insights',
  '/privacy',
  '/terms',
  '/security'
];

// Function to extract blog post IDs from the blogPosts.ts file
function getBlogPostIds() {
  try {
    const blogPostsPath = path.join(__dirname, '../src/data/blogPosts.ts');
    const blogPostsContent = fs.readFileSync(blogPostsPath, 'utf-8');
    
    // Extract blog post IDs using regex
    const idMatches = blogPostsContent.match(/id: "([^"]+)"/g);
    if (!idMatches) return [];
    
    return idMatches.map(match => match.replace('id: "', '').replace('"', ''));
  } catch (error) {
    console.warn('Could not read blog posts file:', error.message);
    return [];
  }
}

// Generate sitemap XML
function generateSitemap() {
  const blogPostIds = getBlogPostIds();
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static routes
  staticRoutes.forEach(route => {
    const priority = route === '/' ? '1.0' : '0.8';
    const changefreq = route === '/' ? 'weekly' : 'monthly';
    
    sitemap += `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  // Add blog post routes
  blogPostIds.forEach(id => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/blog/${id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

// Write sitemap to dist folder
function writeSitemap() {
  const sitemapContent = generateSitemap();
  const distPath = path.join(__dirname, '../dist');
  const sitemapPath = path.join(distPath, 'sitemap.xml');
  
  // Ensure dist directory exists
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }
  
  // Write sitemap
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');
  
  console.log(`✅ Sitemap generated successfully at ${sitemapPath}`);
  console.log(`📄 Generated ${staticRoutes.length} static routes and ${getBlogPostIds().length} blog post routes`);
}

// Run the generator
writeSitemap();