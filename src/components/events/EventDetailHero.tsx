import Image from "next/image";
import { ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCategoryMeta } from "@/lib/categories";
import { skipOptimizer } from "@/lib/img";
import type { EventDetail } from "@/types/event";

export function EventDetailHero({ event }: { event: EventDetail }) {
  const category = getCategoryMeta(event.category);
  const Icon = category.icon;

  return (
    <div className="relative h-64 w-full overflow-hidden bg-muted sm:h-80 lg:h-[26rem]">
      {event.banner_url ? (
        <Image
          src={event.banner_url}
          alt={event.title}
          fill
          priority
          unoptimized={skipOptimizer(event.banner_url)}
          className="object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${category.color}55, ${category.color}15)` }}
        >
          <Icon className="size-20" style={{ color: category.color }} />
        </div>
      )}
      <div className="bg-scrim-image absolute inset-0" />

      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge style={{ background: category.color }} className="text-white">
            {category.label}
          </Badge>
          {event.is_actively_sponsored ? <Badge className="bg-amber-500 text-white">Sponsored</Badge> : null}
          {event.status === "cancelled" ? <Badge variant="destructive">Cancelled</Badge> : null}
        </div>
        <h1 className="mt-3 text-2xl font-extrabold text-white text-balance sm:text-4xl">{event.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/85">
          <span className="flex items-center gap-1.5">
            {event.org_logo_url ? (
              <Image
                src={event.org_logo_url}
                alt={event.org_name}
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : null}
            {event.org_name}
            {event.org_is_verified ? <ShieldCheck className="size-4 text-blue-300" /> : null}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="size-4" />
            {event.rsvp_count} going
          </span>
        </div>
      </div>
    </div>
  );
}
