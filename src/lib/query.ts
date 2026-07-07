export type EventsSearchParams = {
  q?: string;
  category?: string;
  city?: string;
  date_from?: string;
  date_to?: string;
  price?: string;
  page?: string;
};

/**
 * Builds an /events href by merging the current search params with overrides.
 * Passing `undefined` for a key removes it. Changing any filter other than
 * `page` resets pagination back to page 1.
 */
export function buildEventsHref(
  current: EventsSearchParams,
  overrides: Partial<EventsSearchParams>
): string {
  const merged: EventsSearchParams = { ...current, ...overrides };
  if (!("page" in overrides)) {
    delete merged.page;
  }

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(merged)) {
    if (value) params.set(key, value);
  }
  const qs = params.toString();
  return qs ? `/events?${qs}` : "/events";
}
