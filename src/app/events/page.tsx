import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock } from "lucide-react";

// event-backend isn't deployed yet, so event browsing (search, filters,
// pagination) is disabled for now and this route shows a static placeholder
// instead of calling the API. Restore the live version once the backend is
// up — see git history for the previous implementation using:
//
// import { browseEvents, getEventCategories } from "@/lib/api/events";
// import { getCities } from "@/lib/api/cities";
// import { getCategoryMeta } from "@/lib/categories";
// import { EventFilters } from "@/components/events/EventFilters";
// import { EventGrid } from "@/components/events/EventGrid";
// import { Pagination } from "@/components/events/Pagination";
// import type { EventsSearchParams } from "@/lib/query";

export const metadata: Metadata = {
  title: "Explore Events",
  description: "Browse tech meetups, workshops, concerts, and community events across India. Filter by city, category, date, and price.",
};

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-primary-glow">
        <CalendarClock className="size-6" />
      </span>
      <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">Events launching soon</h1>
      <p className="mx-auto mt-3 max-w-md text-text-muted">
        We&apos;re onboarding organisers and events across India right now. Search and filtering will be live
        here shortly — check back soon, or grab the app to be notified first.
      </p>
      <Link
        href="/#get-app"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-primary-glow transition-transform hover:scale-[1.03]"
      >
        Get notified
      </Link>
    </div>
  );
}
