import { Building2, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
// The organiser dashboard (event/frontend) isn't deployed yet, so this CTA
// doesn't redirect there for now. Restore once it's live:
// import { ArrowRight } from "lucide-react";
// import { ORGANISER_APP_URL } from "@/lib/env";

export function OrganizerCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-cta px-8 py-14 text-center text-white shadow-elevated sm:px-16">
          <div
            aria-hidden
            className="animate-blob-drift absolute -top-20 -right-20 size-72 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="animate-blob-drift absolute -bottom-24 -left-16 size-64 rounded-full bg-white/5 blur-3xl"
            style={{ animationDelay: "3s" }}
          />
          <Building2 className="mx-auto size-10" />
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Running an event? Reach the right audience.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Create your organisation, list your event, and manage RSVPs, tickets, and check-ins — all from the
            HappnCity organiser dashboard.
          </p>
          <span
            aria-disabled
            className="mt-7 inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-brand-700 shadow-soft"
          >
            <Clock className="size-4" />
            Organiser dashboard — coming soon
          </span>
        </div>
      </ScrollReveal>
    </section>
  );
}
