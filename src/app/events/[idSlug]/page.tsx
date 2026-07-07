import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getEventById } from "@/lib/api/events";
import { parseEventIdParam, buildEventHref } from "@/lib/event-slug";
import { absoluteUrl, buildEventJsonLd, jsonLdScriptProps } from "@/lib/seo";
import { EventDetailHero } from "@/components/events/EventDetailHero";
import { EventInfoCard } from "@/components/events/EventInfoCard";
import {
  AwardsSection,
  EventDescription,
  FAQSection,
  SessionsSection,
  SpeakersSection,
  SponsorsSection,
} from "@/components/events/EventContentSections";
import { RelatedEvents } from "@/components/events/RelatedEvents";

interface PageProps {
  params: Promise<{ idSlug: string }>;
}

async function loadEvent(idSlug: string) {
  const id = parseEventIdParam(idSlug);
  if (!id) notFound();

  const event = await getEventById(id);
  if (!event) notFound();

  const canonical = buildEventHref(event).replace("/events/", "");
  if (idSlug !== canonical) {
    permanentRedirect(buildEventHref(event));
  }

  return event;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { idSlug } = await params;
  const id = parseEventIdParam(idSlug);
  if (!id) return {};

  const event = await getEventById(id);
  if (!event) return {};

  const url = absoluteUrl(buildEventHref(event));
  const description = event.short_description ?? event.description?.slice(0, 160) ?? undefined;
  const image = event.banner_url ? absoluteUrl(event.banner_url) : undefined;

  return {
    title: event.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: event.title,
      description,
      url,
      type: "website",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { idSlug } = await params;
  const event = await loadEvent(idSlug);
  const url = absoluteUrl(buildEventHref(event));

  return (
    <div>
      <script {...jsonLdScriptProps(buildEventJsonLd(event, url))} />

      <EventDetailHero event={event} />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_20rem]">
          <div className="flex flex-col gap-10">
            <EventDescription event={event} />
            <SessionsSection sessions={event.sessions} />
            <SpeakersSection speakers={event.speakers} />
            <AwardsSection awards={event.awards} />
            <SponsorsSection sponsors={event.sponsors} />
            <FAQSection faqs={event.faqs} />
          </div>

          <div className="lg:row-start-1">
            <EventInfoCard event={event} />
          </div>
        </div>
      </div>

      <RelatedEvents category={event.category} excludeId={event.id} />
    </div>
  );
}
