import Link from "next/link";
import { AccentBar } from "@/components/marketing/AccentBar";
import { getEventCategories } from "@/lib/api/events";
import { getCategoryMeta } from "@/lib/categories";
import { StaggerGroup, StaggerItem } from "@/components/marketing/ScrollReveal";

export async function CategoryGrid() {
  const categories = await getEventCategories();
  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Browse by category</h2>
          <AccentBar />
          <p className="mt-2 text-text-muted">Pick what you&apos;re into — we&apos;ll do the rest.</p>
        </div>
        <Link href="/events" className="hidden text-sm font-medium text-brand hover:underline sm:block">
          View all →
        </Link>
      </div>

      <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat) => {
          const meta = getCategoryMeta(cat.code);
          const Icon = meta.icon;
          return (
            <StaggerItem key={cat.code}>
              <Link
                href={`/events?category=${cat.code}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border-subtle bg-surface-elevated p-5 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
              >
                <span
                  className="flex size-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: `${meta.color}1a`, color: meta.color }}
                >
                  <Icon className="size-6" />
                </span>
                <span className="text-sm font-semibold text-foreground">{meta.label}</span>
                <span className="text-xs text-text-muted">{cat.event_count} events</span>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
