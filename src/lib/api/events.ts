import { apiGet } from "@/lib/api/client";
import type {
  BrowseEventsResult,
  EventCategoryCount,
  EventDetail,
  EventSummary,
  FeaturedEvent,
} from "@/types/event";

export interface BrowseEventsParams {
  q?: string;
  category?: string;
  city_id?: string | number;
  date_from?: string;
  date_to?: string;
  price?: "free" | "paid";
  page?: number;
  limit?: number;
}

export async function browseEvents(params: BrowseEventsParams = {}): Promise<BrowseEventsResult> {
  const data = await apiGet<BrowseEventsResult>("/events", {
    params: { ...params },
    revalidate: 60,
    tags: ["events"],
  });
  return data ?? { events: [], pagination: { page: 1, limit: params.limit ?? 20, total: 0, total_pages: 0, has_more: false } };
}

export async function getTrendingEvents(cityId?: string | number, limit = 10): Promise<EventSummary[]> {
  const data = await apiGet<{ events: EventSummary[] }>("/events/trending", {
    params: { city_id: cityId, limit },
    revalidate: 120,
    tags: ["events", "events:trending"],
  });
  return data?.events ?? [];
}

export async function getEventCategories(): Promise<EventCategoryCount[]> {
  const data = await apiGet<{ categories: EventCategoryCount[] }>("/events/categories", {
    revalidate: 300,
    tags: ["events:categories"],
  });
  return data?.categories ?? [];
}

export async function getFeaturedEvents(): Promise<FeaturedEvent[]> {
  const data = await apiGet<{ events: FeaturedEvent[] }>("/system/featured-events", {
    revalidate: 300,
    tags: ["events:featured"],
  });
  return data?.events ?? [];
}

export async function getEventById(eventId: number | string): Promise<EventDetail | null> {
  const data = await apiGet<{ event: EventDetail }>(`/events/${eventId}`, {
    revalidate: 60,
    tags: ["events", `event:${eventId}`],
  });
  return data?.event ?? null;
}
