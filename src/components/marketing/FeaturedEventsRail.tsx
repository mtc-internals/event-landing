import Link from "next/link";
import Image from "next/image";
import { Flame, Users } from "lucide-react";
import { AccentBar } from "@/components/marketing/AccentBar";
import { getFeaturedEvents } from "@/lib/api/events";
import { getCategoryMeta } from "@/lib/categories";
import { parseFeaturedEventId } from "@/lib/event-slug";
import { skipOptimizer } from "@/lib/img";
import { StaggerGroup, StaggerItem } from "@/components/marketing/ScrollReveal";

export async function FeaturedEventsRail() {
  const events = await getFeaturedEvents();
  if (events.length === 0) return null;

  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Flame className="size-5 text-accent-coral" />
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured this week</h2>
          </div>
          <AccentBar />
        </div>

        <StaggerGroup className="flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {events.map((event) => {
            const meta = getCategoryMeta(event.category);
            const numericId = parseFeaturedEventId(event.id);
            const href = numericId ? `/events/${numericId}` : "/events";
            return (
              <StaggerItem key={event.id} className="w-64 shrink-0 snap-start sm:w-auto">
                <Link
                  href={href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                    <Image
                      src={event.image_url}
                      alt={event.title}
                      fill
                      sizes="(min-width: 1024px) 280px, 60vw"
                      unoptimized={skipOptimizer(event.image_url)}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded-lg bg-white/95 px-2 py-1 text-[0.65rem] font-bold tracking-wide text-brand uppercase shadow-soft">
                      {event.day_label}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <span className="text-xs font-medium" style={{ color: meta.color }}>
                      {meta.label}
                    </span>
                    <h3 className="line-clamp-2 text-sm font-semibold text-foreground">{event.title}</h3>
                    <span className="mt-auto flex items-center gap-1.5 text-xs text-text-muted">
                      <Users className="size-3.5" />
                      {event.going_count} going
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
