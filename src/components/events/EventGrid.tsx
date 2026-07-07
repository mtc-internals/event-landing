import Link from "next/link";
import { CalendarX } from "lucide-react";
import { EventCard } from "@/components/events/EventCard";
import type { EventSummary } from "@/types/event";

export function EventGrid({ events }: { events: EventSummary[] }) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border-subtle bg-surface py-20 text-center">
        <CalendarX className="size-10 text-text-faint" />
        <p className="font-medium text-foreground">No events match your filters</p>
        <p className="max-w-sm text-sm text-text-muted">
          Try widening your search — clear a filter or check back soon for new listings.
        </p>
        <Link href="/events" className="mt-2 text-sm font-semibold text-brand hover:underline">
          Clear all filters
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
