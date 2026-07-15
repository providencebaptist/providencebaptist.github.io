import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BASE_URL, getSiteRoutes } from "./site-routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, "..", "dist");
const INDEX_PATH = path.join(DIST_DIR, "index.html");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function fullTitle(title) {
  return title.includes("Providence Baptist Church")
    ? title
    : `${title} | Providence Baptist Church`;
}

function replaceMeta(html, attribute, key, content) {
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`;
  const pattern = new RegExp(`<meta\\s+${attribute}=["']${key}["'][^>]*>`, "i");
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `  ${tag}\n</head>`);
}

function renderRouteHtml(template, route) {
  const title = fullTitle(route.title);
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${escapeHtml(route.url)}" />`,
  );

  const namedMeta = {
    title,
    description: route.description,
    "twitter:card": "summary_large_image",
    "twitter:url": route.url,
    "twitter:title": title,
    "twitter:description": route.description,
    "twitter:image": route.image,
  };
  for (const [key, value] of Object.entries(namedMeta)) {
    html = replaceMeta(html, "name", key, value);
  }

  const propertyMeta = {
    "og:type": route.type,
    "og:url": route.url,
    "og:title": title,
    "og:description": route.description,
    "og:image": route.image,
  };
  for (const [key, value] of Object.entries(propertyMeta)) {
    html = replaceMeta(html, "property", key, value);
  }

  return html;
}

function writeRouteFiles(route, html) {
  if (route.path === "/") {
    fs.writeFileSync(INDEX_PATH, html);
    return;
  }

  const relativePath = route.path.replace(/^\//, "");
  const extensionlessPath = path.join(DIST_DIR, `${relativePath}.html`);
  const directoryIndexPath = path.join(DIST_DIR, relativePath, "index.html");
  fs.mkdirSync(path.dirname(extensionlessPath), { recursive: true });
  fs.mkdirSync(path.dirname(directoryIndexPath), { recursive: true });
  fs.writeFileSync(extensionlessPath, html);
  fs.writeFileSync(directoryIndexPath, html);
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function buildSitemap(routes) {
  const lastModified = new Date().toISOString().slice(0, 10);
  const entries = routes
    .map((route) => {
      const priority = route.path === "/" ? "1.0" : route.path.split("/").length > 2 ? "0.7" : "0.8";
      const frequency = route.path === "/" || route.path === "/events" || route.path === "/sermons" ? "weekly" : "monthly";
      return `  <url>\n    <loc>${escapeXml(route.url)}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>${frequency}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

function buildNotFoundPage(template) {
  const route = {
    title: "Page Not Found",
    description: "The page you requested could not be found.",
    image: `${BASE_URL}/og-image.jpg`,
    type: "website",
    url: `${BASE_URL}/404`,
  };
  let html = renderRouteHtml(template, route);
  html = replaceMeta(html, "name", "robots", "noindex, follow");
  return html;
}

if (!fs.existsSync(INDEX_PATH)) {
  throw new Error(`Build output is missing: ${INDEX_PATH}`);
}

const template = fs.readFileSync(INDEX_PATH, "utf8");
const routes = getSiteRoutes();
const routePaths = routes.map((route) => route.path);
if (new Set(routePaths).size !== routePaths.length) {
  throw new Error("Site route inventory contains duplicate paths.");
}
for (const route of routes) {
  writeRouteFiles(route, renderRouteHtml(template, route));
}

fs.writeFileSync(path.join(DIST_DIR, "404.html"), buildNotFoundPage(template));
fs.writeFileSync(path.join(DIST_DIR, "sitemap.xml"), buildSitemap(routes));

console.log(`Generated ${routes.length} routable HTML pages, 404.html, and sitemap.xml.`);
