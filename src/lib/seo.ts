import { SITE_URL } from "@/lib/env";
import { toIsoIst } from "@/lib/format";
import type { EventDetail } from "@/types/event";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** JSON-LD requires HTML-safe serialization to avoid XSS via `</script>` breakout. */
export function jsonLdScriptProps(data: unknown) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Evento",
    url: absoluteUrl("/"),
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Evento",
    url: absoluteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/events")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

function eventStatusSchema(status: EventDetail["status"]): string {
  if (status === "cancelled") return "https://schema.org/EventCancelled";
  return "https://schema.org/EventScheduled";
}

function lowestPricePaise(event: EventDetail): number | null {
  const active = event.tickets.filter((t) => t.is_active);
  if (active.length === 0) return null;
  const prices = active.map((t) => Number(t.price));
  return Math.min(...prices);
}

export function buildEventJsonLd(event: EventDetail, url: string) {
  const image = event.banner_url ? absoluteUrl(event.banner_url) : absoluteUrl("/opengraph-image");
  const isOnline = event.venue_type === "online";
  const isHybrid = event.venue_type === "hybrid";

  const location = isOnline
    ? {
        "@type": "VirtualLocation",
        url: event.online_link_public ? event.online_link ?? url : url,
      }
    : {
        "@type": "Place",
        name: event.venue_name ?? event.org_name,
        address: {
          "@type": "PostalAddress",
          streetAddress: event.venue_address ?? undefined,
          addressLocality: event.city_name ?? undefined,
          addressCountry: "IN",
        },
      };

  const minPrice = lowestPricePaise(event);

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.short_description ?? event.description ?? undefined,
    startDate: toIsoIst(event.starts_at) ?? undefined,
    endDate: event.ends_at ? toIsoIst(event.ends_at) ?? undefined : undefined,
    eventStatus: eventStatusSchema(event.status),
    eventAttendanceMode: isHybrid
      ? "https://schema.org/MixedEventAttendanceMode"
      : isOnline
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    location,
    image: [image],
    organizer: {
      "@type": "Organization",
      name: event.org_name,
    },
    offers: event.is_free
      ? {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url,
        }
      : minPrice !== null
        ? {
            "@type": "Offer",
            price: String(minPrice),
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url,
          }
        : undefined,
  };
}
