import Link from "next/link";
import { Search } from "lucide-react";
import { HeroDoodles } from "@/components/marketing/HeroDoodles";
import { HeroPhotoCollage, type CollagePhoto } from "@/components/marketing/HeroPhotoCollage";
import { getFeaturedEvents, getTrendingEvents } from "@/lib/api/events";
import { CATEGORY_META, CATEGORY_ORDER, getCategoryMeta } from "@/lib/categories";

async function getCollagePhotos(): Promise<CollagePhoto[]> {
  const [featured, trending] = await Promise.all([getFeaturedEvents(), getTrendingEvents(undefined, 8)]);

  const photos: CollagePhoto[] = featured.map((event) => ({
    key: event.id,
    image: event.image_url,
    title: event.title,
    badge: `🔥 ${event.going_count} going`,
    color: getCategoryMeta(event.category).color,
  }));

  for (const event of trending) {
    if (photos.length >= 4) break;
    if (!event.banner_url) continue;
    if (photos.some((p) => p.title === event.title)) continue;
    photos.push({
      key: String(event.id),
      image: event.banner_url,
      title: event.title,
      badge: event.city_name ? `📍 ${event.city_name}` : `${event.rsvp_count} going`,
      color: getCategoryMeta(event.category).color,
    });
  }

  return photos.slice(0, 4);
}

export async function Hero() {
  const photos = await getCollagePhotos();
  const quickCategories = CATEGORY_ORDER.slice(0, 5);

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div
        aria-hidden
        className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_80%)]"
      />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <HeroPhotoCollage photos={photos} />
        <HeroDoodles />

        <div className="relative mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-elevated px-3 py-1 text-xs font-medium text-text-muted shadow-soft">
            Now live across every major Indian city
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            The events platform.
            <br />
            Where interests{" "}
            <span className="bg-gradient-brand bg-clip-text text-transparent">become plans</span> 🎉
          </h1>

          <p className="mx-auto mt-5 max-w-md text-lg text-text-muted text-balance">
            Tech meetups, workshops, concerts, and community gatherings — find what&apos;s on in your city and join
            in.
          </p>

          <form action="/events" method="GET" className="mx-auto mt-8 flex max-w-xl gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                name="q"
                placeholder="Search events, topics, or organizers"
                className="h-12 w-full rounded-full border border-border-subtle bg-surface-elevated pr-4 pl-11 text-sm shadow-soft outline-none focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20"
              />
            </div>
            <button
              type="submit"
              className="h-12 shrink-0 rounded-full bg-gradient-brand px-6 text-sm font-semibold text-white shadow-primary-glow transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {quickCategories.map((code) => (
              <Link
                key={code}
                href={`/events?category=${code}`}
                className="rounded-full border border-border-subtle bg-surface-elevated px-3.5 py-1.5 text-xs font-medium text-text-muted transition-colors hover:border-brand/30 hover:text-brand"
              >
                {CATEGORY_META[code].label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
