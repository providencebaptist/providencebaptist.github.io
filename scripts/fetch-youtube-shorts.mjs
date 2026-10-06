// Fetches the latest YouTube Shorts from the church channel's public feed
// and writes them to public/youtube-shorts.json. Keeps the old file on failure.
import { writeFileSync } from "node:fs";

const PLAYLIST = "UUSHblyD0D5m6QWqNrjjMqy_cw";
const OUT = new URL("../public/youtube-shorts.json", import.meta.url);

try {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => {
    const e = m[1];
    const pick = (re) => (e.match(re) || [])[1] || "";
    return {
      id: pick(/<yt:videoId>([^<]+)<\/yt:videoId>/),
      title: pick(/<title>([^<]+)<\/title>/)
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'"),
      published: pick(/<published>([^<]+)<\/published>/),
    };
  });
  const shorts = entries
    .filter((s) => s.id)
    .sort((a, b) => b.published.localeCompare(a.published))
    .slice(0, 3);
  if (shorts.length) {
    writeFileSync(OUT, JSON.stringify({ updated: new Date().toISOString(), shorts }, null, 2) + "\n");
    console.log(`youtube-shorts.json: ${shorts.length} shorts`);
  }
} catch (err) {
  console.warn("Could not refresh YouTube Shorts, keeping existing file:", err.message);
}
