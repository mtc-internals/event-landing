import Image from "next/image";
import { Calendar, ExternalLink, MapPin, ShieldCheck, Ticket, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppRedirectDialog } from "@/components/shared/AppRedirectDialog";
import { formatEventDateRange } from "@/lib/format";
import type { EventDetail } from "@/types/event";

function priceRange(event: EventDetail): string {
  if (event.is_free) return "Free";
  const activeTickets = event.tickets.filter((t) => t.is_active);
  if (activeTickets.length === 0) return "Paid";
  const prices = activeTickets.map((t) => Number(t.price));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (min === max) return `₹${min.toLocaleString("en-IN")}`;
  return `₹${min.toLocaleString("en-IN")} – ₹${max.toLocaleString("en-IN")}`;
}

export function EventInfoCard({ event }: { event: EventDetail }) {
  const closedForAction = event.status === "cancelled" || event.status === "completed";

  return (
    <div className="sticky top-24 flex flex-col gap-5 rounded-2xl border border-border-subtle bg-surface-elevated p-5 shadow-card">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
          <Calendar className="size-4.5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">{formatEventDateRange(event.starts_at, event.ends_at)}</p>
          <p className="text-xs text-text-muted">Indian Standard Time</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
          {event.venue_type === "online" ? <Video className="size-4.5" /> : <MapPin className="size-4.5" />}
        </span>
        <div className="min-w-0">
          {event.venue_type === "online" ? (
            <>
              <p className="text-sm font-semibold text-foreground">Online event</p>
              {event.online_link_public && event.online_link ? (
                <a
                  href={event.online_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 flex items-center gap-1 text-xs text-brand hover:underline"
                >
                  Join link <ExternalLink className="size-3" />
                </a>
              ) : (
                <p className="text-xs text-text-muted">Link shared with registered attendees</p>
              )}
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-foreground">
                {event.venue_name ?? "Venue to be announced"}
              </p>
              <p className="text-xs text-text-muted">
                {[event.venue_address, event.city_name].filter(Boolean).join(", ") || "Location details in the app"}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
          <Ticket className="size-4.5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">{priceRange(event)}</p>
          <p className="flex items-center gap-1 text-xs text-text-muted">
            <Users className="size-3" />
            {event.rsvp_count} going{event.rsvp_limit ? ` · ${event.rsvp_limit} spots` : ""}
          </p>
        </div>
      </div>

      {!closedForAction ? (
        <AppRedirectDialog
          eventTitle={event.title}
          trigger={
            <Button size="lg" className="w-full">
              {event.is_free ? "RSVP now" : "Get Tickets"}
            </Button>
          }
        />
      ) : (
        <Button size="lg" className="w-full" disabled>
          {event.status === "cancelled" ? "Event cancelled" : "Event completed"}
        </Button>
      )}

      <div className="flex items-center gap-2 border-t border-border-subtle pt-4">
        {event.org_logo_url ? (
          <Image
            src={event.org_logo_url}
            alt={event.org_name}
            width={32}
            height={32}
            className="size-8 rounded-full object-cover"
          />
        ) : (
          <span className="flex size-8 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
            {event.org_name.charAt(0)}
          </span>
        )}
        <div className="min-w-0">
          <p className="flex items-center gap-1 truncate text-sm font-medium text-foreground">
            {event.org_name}
            {event.org_is_verified ? <ShieldCheck className="size-3.5 text-blue-500" /> : null}
          </p>
          <p className="text-xs text-text-muted">{event.org_follower_count} followers</p>
        </div>
      </div>
    </div>
  );
}
