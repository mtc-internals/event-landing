import Link from "next/link";
import { Search } from "lucide-react";
import { FilterSelectField } from "@/components/events/FilterSelectField";
import { CATEGORY_META, CATEGORY_ORDER } from "@/lib/categories";
import { buildEventsHref, type EventsSearchParams } from "@/lib/query";
import type { City, EventCategoryCount } from "@/types/event";
import { cn } from "@/lib/utils";

export function EventFilters({
  current,
  cities,
  categoryCounts,
}: {
  current: EventsSearchParams;
  cities: City[];
  categoryCounts: EventCategoryCount[];
}) {
  const countByCode = Object.fromEntries(categoryCounts.map((c) => [c.code, c.event_count]));

  return (
    <div className="flex flex-col gap-4">
      <form action="/events" method="GET" className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-56 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            name="q"
            defaultValue={current.q}
            placeholder="Search events..."
            className="h-10 w-full rounded-lg border border-border-subtle bg-surface-elevated pr-3 pl-9 text-sm outline-none focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20"
          />
        </div>

        {current.category ? <input type="hidden" name="category" value={current.category} /> : null}

        <FilterSelectField
          name="city"
          placeholder="Any city"
          defaultValue={current.city}
          options={[
            { value: "", label: "Any city" },
            ...cities.map((city) => ({ value: String(city.id), label: city.name })),
          ]}
        />

        <FilterSelectField
          name="price"
          placeholder="Any price"
          defaultValue={current.price}
          options={[
            { value: "", label: "Any price" },
            { value: "free", label: "Free" },
            { value: "paid", label: "Paid" },
          ]}
        />

        <input
          type="date"
          name="date_from"
          defaultValue={current.date_from}
          aria-label="From date"
          className="h-10 rounded-lg border border-border-subtle bg-surface-elevated px-3 text-sm text-text-muted outline-none focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20"
        />
        <input
          type="date"
          name="date_to"
          defaultValue={current.date_to}
          aria-label="To date"
          className="h-10 rounded-lg border border-border-subtle bg-surface-elevated px-3 text-sm text-text-muted outline-none focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20"
        />

        <button
          type="submit"
          className="h-10 shrink-0 rounded-lg bg-gradient-brand px-5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Apply
        </button>

        {current.q || current.category || current.city || current.price || current.date_from || current.date_to ? (
          <Link
            href="/events"
            className="text-sm font-medium text-text-muted underline-offset-4 hover:text-foreground hover:underline"
          >
            Clear all
          </Link>
        ) : null}
      </form>

      <div className="flex flex-wrap gap-2">
        <Link
          href={buildEventsHref(current, { category: undefined })}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
            !current.category
              ? "border-brand bg-brand text-white"
              : "border-border-subtle bg-surface-elevated text-text-muted hover:border-brand/30 hover:text-brand"
          )}
        >
          All
        </Link>
        {CATEGORY_ORDER.map((code) => {
          const active = current.category === code;
          return (
            <Link
              key={code}
              href={buildEventsHref(current, { category: active ? undefined : code })}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "border-brand bg-brand text-white"
                  : "border-border-subtle bg-surface-elevated text-text-muted hover:border-brand/30 hover:text-brand"
              )}
            >
              {CATEGORY_META[code].label}
              {countByCode[code] ? ` (${countByCode[code]})` : ""}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
