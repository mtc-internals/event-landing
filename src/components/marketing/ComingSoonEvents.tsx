import { Sparkles } from "lucide-react";
import { AccentBar } from "@/components/marketing/AccentBar";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";

/**
 * Static placeholder shown in place of the live event rails (Featured,
 * Trending, Category grid, Events-near-you) while event-backend isn't
 * deployed yet. Swap this back out for those sections once it's live.
 */
export function ComingSoonEvents() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <ScrollReveal className="mx-auto max-w-2xl rounded-3xl border border-dashed border-border-subtle bg-surface-elevated px-8 py-16 text-center shadow-soft">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-primary-glow">
          <Sparkles className="size-6" />
        </span>
        <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">Events launching soon</h2>
        <AccentBar className="mx-auto" />
        <p className="mx-auto mt-3 max-w-md text-text-muted">
          We&apos;re onboarding organisers and events across India right now. Check back shortly, or grab the
          app to be the first to know when events go live near you.
        </p>
        <a
          href="#get-app"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-primary-glow transition-transform hover:scale-[1.03]"
        >
          Get notified
        </a>
      </ScrollReveal>
    </section>
  );
}
