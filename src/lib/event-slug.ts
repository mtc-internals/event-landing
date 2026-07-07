/**
 * Event detail URLs are "/events/{id}-{slug}" (e.g. "/events/42-summer-meetup").
 * The backend only looks events up by numeric id, so we accept either just
 * the id or "id-slug" here and let the page canonicalize (redirect) once it
 * knows the event's real slug.
 */
export function parseEventIdParam(idSlug: string): number | null {
  const match = idSlug.match(/^(\d+)(?:-.*)?$/);
  if (!match) return null;
  const id = Number(match[1]);
  return Number.isFinite(id) ? id : null;
}

export function buildEventHref(event: { id: number; slug: string }): string {
  return `/events/${event.id}-${event.slug}`;
}

/** Extracts the numeric id out of a featured-event id like "evt_123". */
export function parseFeaturedEventId(featuredId: string): number | null {
  const match = featuredId.match(/(\d+)$/);
  if (!match) return null;
  const id = Number(match[1]);
  return Number.isFinite(id) ? id : null;
}
