import express from "express";
import cors from "cors";
import { parseStringPromise } from "xml2js";

const app = express();
const PORT = 3001;

app.use(cors());

const RSS_SOURCES = [
  {
    name: "EN World",
    url: "https://www.enworld.org/forums/-/index.rss",
  },
  {
    name: "Gnome Stew",
    url: "https://gnomestew.com/feed/",
  },
  {
    name: "The Angry GM",
    url: "https://theangrygm.com/feed/",
  },
  {
    name: "Tribality",
    url: "https://www.tribality.com/feed/",
  },
  {
    name: "r/DnD",
    url: "https://www.reddit.com/r/DnD/hot/.rss",
  },
];

const fetchFeed = async (source) => {
  const response = await fetch(source.url, {
    headers: { "User-Agent": "dnd-companion-app/1.0" },
  });
  const xml = await response.text();
  const parsed = await parseStringPromise(xml, { explicitArray: false });

  // Handle both RSS 2.0 and Atom formats
  const channel = parsed?.rss?.channel;
  const feed = parsed?.feed;

  if (channel) {
    const items = Array.isArray(channel.item) ? channel.item : [channel.item];
    return items.slice(0, 5).map((item) => ({
      title: item.title?.trim() ?? "Untitled",
      link: item.link?.trim() ?? "#",
      date: item.pubDate ? new Date(item.pubDate).toISOString() : null,
      source: source.name,
    }));
  }

  if (feed) {
    const entries = Array.isArray(feed.entry) ? feed.entry : [feed.entry];
    return entries.slice(0, 5).map((entry) => ({
      title: entry.title?._ ?? entry.title?.trim() ?? "Untitled",
      link: Array.isArray(entry.link)
        ? entry.link.find((l) => l?.$?.rel === "alternate")?.$?.href ?? "#"
        : entry.link?.$?.href ?? "#",
      date: entry.updated ? new Date(entry.updated).toISOString() : null,
      source: source.name,
    }));
  }

  return [];
};

app.get("/api/dnd-news", async (req, res) => {
  try {
    const results = await Promise.allSettled(
      RSS_SOURCES.map((source) => fetchFeed(source))
    );

    const articles = results
      .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
      .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

    res.json({ articles });
  } catch (err) {
    console.error("RSS fetch error:", err);
    res.status(500).json({ error: "Failed to fetch news." });
  }
});

app.listen(PORT, () => {
  console.log(`DnD Companion server running at http://localhost:${PORT}`);
});
