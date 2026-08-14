"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { City } from "@/types/event";

const MAX_MATCH_DISTANCE_KM = 100;
const ASKED_SESSION_KEY = "HappnCity:geo-asked";

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function nearestCity(lat: number, lng: number, cities: City[]): City | null {
  let best: City | null = null;
  let bestDistance = Infinity;
  for (const city of cities) {
    if (!city.latitude || !city.longitude) continue;
    const distance = haversineKm(lat, lng, Number(city.latitude), Number(city.longitude));
    if (distance < bestDistance) {
      bestDistance = distance;
      best = city;
    }
  }
  return bestDistance <= MAX_MATCH_DISTANCE_KM ? best : null;
}

/**
 * Renders nothing. On first homepage load (once per browser session, and
 * only when the user hasn't already picked a city via `?city=`), asks the
 * browser for location permission and — if granted and it matches one of
 * our cities within ~100km — swaps in that city as the default for the
 * "Events near you" section. Silently no-ops on denial/error/no match, so
 * the existing server-picked fallback city just stays as-is.
 */
export function LocationDetector({ cities }: { cities: City[] }) {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("city")) return;
    if (!("geolocation" in navigator)) return;
    if (sessionStorage.getItem(ASKED_SESSION_KEY)) return;
    sessionStorage.setItem(ASKED_SESSION_KEY, "1");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const match = nearestCity(position.coords.latitude, position.coords.longitude, cities);
        if (match) {
          router.replace(`/?city=${match.id}#near-you`, { scroll: false });
        }
      },
      () => {
        // permission denied or unavailable — keep the default city
      },
      { timeout: 8000, maximumAge: 10 * 60 * 1000 }
    );
  }, [cities, router]);

  return null;
}
