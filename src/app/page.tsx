import { Hero } from "@/components/marketing/Hero";
import { ComingSoonEvents } from "@/components/marketing/ComingSoonEvents";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { OrganizerCTA } from "@/components/marketing/OrganizerCTA";
import { AppDownloadCTA } from "@/components/marketing/AppDownloadCTA";

// The sections below call event-backend, which isn't deployed yet.
// Re-enable them (and remove ComingSoonEvents) once the backend is live:
//
// import { CityEventsSection } from "@/components/marketing/CityEventsSection";
// import { LocationDetector } from "@/components/marketing/LocationDetector";
// import { FeaturedEventsRail } from "@/components/marketing/FeaturedEventsRail";
// import { CategoryGrid } from "@/components/marketing/CategoryGrid";
// import { TrendingEventsRail } from "@/components/marketing/TrendingEventsRail";
// import { getCities } from "@/lib/api/cities";

export default function Home() {
  // const [{ city }, cities] = await Promise.all([searchParams, getCities({ limit: 60 })]);

  return (
    <>
      {/* <LocationDetector cities={cities} /> */}
      <Hero />
      {/* <CityEventsSection cityParam={city} cities={cities} /> */}
      {/* <FeaturedEventsRail /> */}
      {/* <CategoryGrid /> */}
      {/* <TrendingEventsRail /> */}
      <ComingSoonEvents />
      <HowItWorks />
      <OrganizerCTA />
      <AppDownloadCTA />
    </>
  );
}
