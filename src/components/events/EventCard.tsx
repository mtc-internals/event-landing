import Image from "next/image";
import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCategoryMeta } from "@/lib/categories";
import { buildEventHref } from "@/lib/event-slug";
import { formatDayNumber, formatMonthShort, priceLabel, venueLabel } from "@/lib/format";
import { skipOptimizer } from "@/lib/img";
import type { EventSummary } from "@/types/event";
import { cn } from "@/lib/utils";

export function EventCard({ event, className }: { event: EventSummary; className?: string }) {
  const category = getCategoryMeta(event.category);
  const Icon = category.icon;

  return (
    <Link
      href={buildEventHref(event)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated",
        className
      )}
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
        {event.banner_url ? (
          <Image
            src={event.banner_url}
            alt={event.title}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
            unoptimized={skipOptimizer(event.banner_url)}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${category.color}33, ${category.color}0d)` }}
          >
            <Icon className="size-10" style={{ color: category.color }} />
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-col items-center rounded-xl bg-white/95 px-2.5 py-1.5 text-center leading-none shadow-soft backdrop-blur">
          <span className="text-[0.65rem] font-semibold tracking-wide text-brand uppercase">
            {formatMonthShort(event.starts_at)}
          </span>
          <span className="text-base font-bold text-foreground">{formatDayNumber(event.starts_at)}</span>
        </div>

        {event.is_actively_sponsored ? (
          <Badge className="absolute top-3 right-3 bg-amber-500 text-white">Sponsored</Badge>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: category.color }}>
          <Icon className="size-3.5" />
          {category.label}
        </div>

        <h3 className="line-clamp-2 text-base font-semibold text-foreground">{event.title}</h3>

        <div className="mt-auto flex flex-col gap-1.5 pt-1 text-sm text-text-muted">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3.5 shrink-0" />
            <span className="line-clamp-1">{venueLabel(event)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5 shrink-0" />
              {event.rsvp_count} going
            </span>
            <Badge variant={event.is_free ? "secondary" : "outline"}>{priceLabel(event.is_free)}</Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}
