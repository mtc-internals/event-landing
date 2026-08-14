import Link from "next/link";
import Image from "next/image";
import { CATEGORY_META, CATEGORY_ORDER } from "@/lib/categories";
import logo from "@/app/logo.jpeg";
// The organiser dashboard (event/frontend) isn't deployed yet, so these
// links don't redirect there for now. Restore once it's live:
// import { ORGANISER_APP_URL } from "@/lib/env";

export function Footer() {
  const year = new Date().getFullYear();
  const topCategories = CATEGORY_ORDER.slice(0, 6);

  return (
    <footer className="border-t border-border-subtle bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image src={logo} alt="HappnCity" className="size-8 rounded-xl" />
              <span className="text-lg font-bold tracking-tight">HappnCity</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-text-muted">Be Where It Happens.</p>
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
              <li className="flex items-center gap-1.5 text-sm text-text-faint">
                Create an Organisation
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-[0.65rem] font-semibold text-text-muted">
                  Soon
                </span>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-text-faint">
                Host an Event
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-[0.65rem] font-semibold text-text-muted">
                  Soon
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">HappnCity</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/" className="text-sm text-text-muted hover:text-foreground">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-text-muted hover:text-foreground">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-text-muted hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-sm text-text-muted hover:text-foreground">
                  Refund & Cancellation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border-subtle pt-6 text-sm text-text-faint">
          © {year} HappnCity, a product of Modern Tech Creations. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
