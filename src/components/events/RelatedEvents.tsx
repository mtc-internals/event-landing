import { browseEvents } from "@/lib/api/events";
import { EventCard } from "@/components/events/EventCard";

export async function RelatedEvents({
  category,
  excludeId,
}: {
  category: string;
  excludeId: number;
}) {
  const { events } = await browseEvents({ category, limit: 5 });
  const related = events.filter((e) => e.id !== excludeId).slice(0, 4);
  if (related.length === 0) return null;

  return (
    <section className="border-t border-border-subtle bg-surface py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-foreground">More events you might like</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
