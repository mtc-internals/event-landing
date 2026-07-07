import { Hero } from "@/components/marketing/Hero";
import { CityEventsSection } from "@/components/marketing/CityEventsSection";
import { LocationDetector } from "@/components/marketing/LocationDetector";
import { FeaturedEventsRail } from "@/components/marketing/FeaturedEventsRail";
import { CategoryGrid } from "@/components/marketing/CategoryGrid";
import { TrendingEventsRail } from "@/components/marketing/TrendingEventsRail";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { OrganizerCTA } from "@/components/marketing/OrganizerCTA";
import { AppDownloadCTA } from "@/components/marketing/AppDownloadCTA";
import { getCities } from "@/lib/api/cities";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const [{ city }, cities] = await Promise.all([searchParams, getCities({ limit: 60 })]);

  return (
    <>
      <LocationDetector cities={cities} />
      <Hero />
      <CityEventsSection cityParam={city} cities={cities} />
      <FeaturedEventsRail />
      <CategoryGrid />
      <TrendingEventsRail />
      <HowItWorks />
      <OrganizerCTA />
      <AppDownloadCTA />
    </>
  );
}
