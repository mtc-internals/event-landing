import { TrendingUp } from "lucide-react";
import { AccentBar } from "@/components/marketing/AccentBar";
import { getTrendingEvents } from "@/lib/api/events";
import { EventCard } from "@/components/events/EventCard";
import { StaggerGroup, StaggerItem } from "@/components/marketing/ScrollReveal";

export async function TrendingEventsRail() {
  const events = await getTrendingEvents(undefined, 8);
  if (events.length === 0) return null;

  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-5 text-brand" />
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Trending across India</h2>
          </div>
          <AccentBar />
        </div>

        <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <StaggerItem key={event.id}>
              <EventCard event={event} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
