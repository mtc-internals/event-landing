import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ORGANISER_APP_URL } from "@/lib/env";
import { CATEGORY_META, CATEGORY_ORDER } from "@/lib/categories";

export function Footer() {
  const year = new Date().getFullYear();
  const topCategories = CATEGORY_ORDER.slice(0, 6);

  return (
    <footer className="border-t border-border-subtle bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-xl bg-gradient-brand text-white">
                <Sparkles className="size-4" />
              </span>
              <span className="text-lg font-bold tracking-tight">Evento</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-text-muted">
              Discover tech meetups, workshops, concerts, and community events happening near you.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Explore</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/events" className="text-sm text-text-muted hover:text-foreground">
                  All Events
                </Link>
              </li>
              {topCategories.map((code) => (
                <li key={code}>
                  <Link
                    href={`/events?category=${code}`}
                    className="text-sm text-text-muted hover:text-foreground"
                  >
                    {CATEGORY_META[code].label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Organizers</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={ORGANISER_APP_URL} className="text-sm text-text-muted hover:text-foreground">
                  Create an Organisation
                </a>
              </li>
              <li>
                <a href={ORGANISER_APP_URL} className="text-sm text-text-muted hover:text-foreground">
                  Host an Event
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Evento</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/" className="text-sm text-text-muted hover:text-foreground">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border-subtle pt-6 text-sm text-text-faint">
          © {year} Evento. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
