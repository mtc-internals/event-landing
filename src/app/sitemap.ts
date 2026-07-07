import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/env";
import { browseEvents } from "@/lib/api/events";
import { buildEventHref } from "@/lib/event-slug";

const MAX_PAGES = 10; // safety cap: up to 500 indexed events per build
const PAGE_SIZE = 50;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/events`, changeFrequency: "hourly", priority: 0.9 },
  ];

  const eventRoutes: MetadataRoute.Sitemap = [];
  let page = 1;
  let totalPages = 1;

  do {
    const { events, pagination } = await browseEvents({ page, limit: PAGE_SIZE });
    totalPages = pagination.total_pages;
    for (const event of events) {
      eventRoutes.push({
        url: `${SITE_URL}${buildEventHref(event)}`,
        lastModified: event.starts_at,
        changeFrequency: "daily",
        priority: 0.7,
      });
    }
    page += 1;
  } while (page <= totalPages && page <= MAX_PAGES);

  return [...staticRoutes, ...eventRoutes];
}
