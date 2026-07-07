import type { Metadata } from "next";
import { browseEvents, getEventCategories } from "@/lib/api/events";
import { getCities } from "@/lib/api/cities";
import { getCategoryMeta } from "@/lib/categories";
import { EventFilters } from "@/components/events/EventFilters";
import { EventGrid } from "@/components/events/EventGrid";
import { Pagination } from "@/components/events/Pagination";
import type { EventsSearchParams } from "@/lib/query";

export const metadata: Metadata = {
  title: "Explore Events",
  description: "Browse tech meetups, workshops, concerts, and community events across India. Filter by city, category, date, and price.",
};

interface PageProps {
  searchParams: Promise<EventsSearchParams>;
}

export default async function EventsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const [{ events, pagination }, cities, categories] = await Promise.all([
    browseEvents({
      q: params.q,
      category: params.category,
      city_id: params.city,
      date_from: params.date_from,
      date_to: params.date_to,
      price: params.price === "free" || params.price === "paid" ? params.price : undefined,
      page,
      limit: 18,
    }),
    getCities({ limit: 60 }),
    getEventCategories(),
  ]);

  const cityName = params.city ? cities.find((c) => String(c.id) === params.city)?.name : undefined;
  const categoryLabel = params.category ? getCategoryMeta(params.category).label : undefined;

  const heading = [categoryLabel, cityName ? `in ${cityName}` : null].filter(Boolean).join(" ") || "All events";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h1>
        <p className="mt-2 text-text-muted">
          {pagination.total} event{pagination.total === 1 ? "" : "s"} found
        </p>
      </div>

      <EventFilters current={params} cities={cities} categoryCounts={categories} />

      <div className="mt-8">
        <EventGrid events={events} />
      </div>

      <Pagination pagination={pagination} current={params} />
    </div>
  );
}
