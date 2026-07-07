import Link from "next/link";
import { browseEvents } from "@/lib/api/events";
import { AccentBar } from "@/components/marketing/AccentBar";
import { CitySelector } from "@/components/marketing/CitySelector";
import { EventCard } from "@/components/events/EventCard";
import { StaggerGroup, StaggerItem } from "@/components/marketing/ScrollReveal";
import type { City } from "@/types/event";

/** Fallback city when the visitor hasn't picked one and geolocation found no match. */
const DEFAULT_CITY_ID = 1;

export async function CityEventsSection({ cityParam, cities }: { cityParam?: string; cities: City[] }) {
  if (cities.length === 0) return null;

  const activeCity = cityParam ? cities.find((c) => String(c.id) === cityParam) : undefined;
  const resolvedCity = activeCity ?? cities.find((c) => c.id === DEFAULT_CITY_ID) ?? cities[0];

  const { events } = await browseEvents({ city_id: resolvedCity.id, limit: 8 });

  return (
    <section id="near-you" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Events near you</h2>
          <AccentBar />
          <p className="mt-2 text-text-muted">Happening soon in {resolvedCity.name}</p>
        </div>
        <CitySelector cities={cities} currentCityId={String(resolvedCity.id)} />
      </div>

      {events.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border-subtle bg-surface py-16 text-center">
          <p className="text-text-muted">No upcoming events in {resolvedCity.name} yet.</p>
          <Link href="/events" className="mt-2 inline-block text-sm font-medium text-brand hover:underline">
            Browse all events →
          </Link>
        </div>
      ) : (
        <>
          <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((event) => (
              <StaggerItem key={event.id}>
                <EventCard event={event} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          <div className="mt-8 text-center">
            <Link
              href={`/events?city=${resolvedCity.id}`}
              className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-surface-elevated px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand/30 hover:text-brand"
            >
              See all events in {resolvedCity.name} →
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
