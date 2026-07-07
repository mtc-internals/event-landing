import { Apple, Calendar, PlayCircle, Sparkles, Ticket } from "lucide-react";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/app-links";

export function AppDownloadCTA() {
  return (
    <section id="get-app" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <ScrollReveal>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            <Sparkles className="size-3.5" />
            Evento mobile app
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Your next event is one tap away
          </h2>
          <p className="mt-4 max-w-md text-text-muted">
            RSVP, buy tickets, get reminders, and check in — the full Evento experience lives in the app.
            Download it free for iOS and Android.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
            >
              <Apple className="size-5" />
              App Store
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-elevated px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.03]"
            >
              <PlayCircle className="size-5" />
              Google Play
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="animate-blob-drift absolute inset-4 rounded-full bg-gradient-brand opacity-20 blur-2xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-[2.5rem] bg-gradient-brand p-1 shadow-elevated">
            <div className="flex h-full w-full flex-col items-center justify-center gap-6 rounded-[2.25rem] bg-surface-elevated/95 p-8 text-center">
              <span className="animate-float-slow flex size-16 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <Ticket className="size-8" />
              </span>
              <span
                className="animate-float-slower flex size-14 items-center justify-center self-end rounded-2xl bg-accent-coral/10 text-accent-coral"
              >
                <Calendar className="size-7" />
              </span>
              <p className="text-sm font-medium text-text-muted">
                Everything you need to never miss out.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
