import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");

export const BASE_URL = "https://pbcatx.org";
export const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

const staticRoutes = [
  {
    path: "/",
    title: "Welcome Home | Providence Baptist Church Georgetown TX",
    description:
      "Providence Baptist Church is a caring church family in Georgetown, Texas. Join us for worship, Bible study, and fellowship. Sunday services at 10AM & 5:30PM.",
  },
  {
    path: "/about",
    title: "About Us",
    description:
      "Learn about Providence Baptist Church Georgetown TX, an Independent Baptist Church celebrating more than 10 years of ministry.",
  },
  {
    path: "/beliefs",
    title: "Our Beliefs - Articles of Faith",
    description:
      "Read the doctrinal statement and articles of faith of Providence Baptist Church Georgetown TX.",
  },
  {
    path: "/history",
    title: "Our History - God's Providence",
    description:
      "Discover the history of Providence Baptist Church Georgetown TX, founded in 2015 by Pastor Kyle Pope.",
  },
  {
    path: "/leadership",
    title: "Meet Our Pastor - Kyle Pope",
    description:
      "Meet Pastor Kyle Pope and learn about the leadership at Providence Baptist Church Georgetown TX.",
  },
  {
    path: "/purpose",
    title: "Purpose & Vision",
    description:
      "Learn about the mission and vision of Providence Baptist Church: Glorify God, Lift up Christ, Walk in the Spirit.",
  },
  {
    path: "/eternity",
    title: "Eternity - The Most Important Decision",
    description:
      "Learn the biblical truths about salvation and eternal life through faith in Jesus Christ.",
  },
  {
    path: "/livestream",
    title: "Watch Live - Online Church Services",
    description:
      "Watch Providence Baptist Church services live online on Sunday and Wednesday.",
  },
  {
    path: "/give",
    title: "Give - Support Our Ministry",
    description:
      "Support Providence Baptist Church Georgetown TX through online giving, in-person offerings, or by mail.",
  },
  {
    path: "/sermons",
    title: "Sermons & Messages",
    description:
      "Listen to biblical preaching and teaching from Pastor Kyle Pope at Providence Baptist Church Georgetown TX.",
    type: "article",
  },
  {
    path: "/events",
    title: "Upcoming Events | Providence Baptist Church",
    description:
      "View upcoming events at Providence Baptist Church in Georgetown, Texas.",
  },
  {
    path: "/contact",
    title: "Contact Us",
    description:
      "Contact Providence Baptist Church in Georgetown, TX or visit us at 505 W. University Ave.",
  },
  {
    path: "/vacation-bible-school-2026",
    title: "Vacation Bible School 2026 | Providence Baptist Church",
    description:
      "Join us July 20-24, 2026 for a week of faith, fun and adventure at Vacation Bible School in Georgetown, TX.",
    image: `${BASE_URL}/og-vbs.jpg`,
  },
];

export function getEventGroupName(name) {
  return name
    .replace(/\s*[-–—]\s*(day|night|part|session|evening)\s*\d+\s*$/i, "")
    .replace(/\s*\((day|night|part|session|evening)\s*\d+\)\s*$/i, "")
    .trim();
}

export function slugifyEvent(name) {
  return getEventGroupName(name)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readJson(filename) {
  return JSON.parse(fs.readFileSync(path.join(PUBLIC_DIR, filename), "utf8"));
}

function getEventRoutes() {
  const churchData = readJson("church-data.json");
  const events = churchData?.organization?.events?.upcoming ?? [];
  const routes = new Map();

  for (const event of events) {
    const slug = slugifyEvent(event.name);
    if (!slug || routes.has(slug)) continue;

    const groupName = getEventGroupName(event.name);
    routes.set(slug, {
      path: `/events/${slug}`,
      title: `${groupName} | Providence Baptist Church`,
      description:
        event.description || `Event details for ${groupName} at Providence Baptist Church.`,
      type: "article",
    });
  }

  return [...routes.values()];
}

function sermonImage(sermon) {
  const video = sermon?.media?.video ?? [];
  return video.find((item) => item.thumbnailImageURL)?.thumbnailImageURL ?? DEFAULT_IMAGE;
}

function getSermonRoutes() {
  const sermonData = readJson("sermons-data.json");
  return (sermonData?.results ?? [])
    .filter((sermon) => /^[a-z0-9_-]+$/i.test(sermon.sermonID ?? ""))
    .map((sermon) => {
      const title = sermon.displayTitle || sermon.fullTitle || "Sermon";
      const speaker = sermon?.speaker?.displayName || "Pastor Kyle Pope";
      const description =
        sermon.moreInfoText?.trim() ||
        `${title}, preached by ${speaker}${sermon.bibleText ? ` from ${sermon.bibleText}` : ""}. Listen or watch at Providence Baptist Church in Georgetown, Texas.`;

      return {
        path: `/sermons/${sermon.sermonID}`,
        title: `${title} - Sermon`,
        description,
        image: sermonImage(sermon),
        type: "article",
      };
    });
}

export function getSiteRoutes() {
  return [...staticRoutes, ...getEventRoutes(), ...getSermonRoutes()].map((route) => ({
    image: DEFAULT_IMAGE,
    type: "website",
    ...route,
    url: route.path === "/" ? BASE_URL : `${BASE_URL}${route.path}`,
  }));
}
