"use client";

import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { City } from "@/types/event";

export function CitySelector({ cities, currentCityId }: { cities: City[]; currentCityId?: string }) {
  const router = useRouter();
  const namesById = Object.fromEntries(cities.map((c) => [String(c.id), c.name]));

  return (
    <Select
      value={currentCityId ?? null}
      onValueChange={(value) => {
        router.push(value ? `/?city=${value}#near-you` : "/#near-you");
      }}
    >
      <SelectTrigger className="h-10 min-w-40 bg-surface-elevated">
        <MapPin className="size-4 text-brand" />
        <SelectValue placeholder="Choose a city">
          {(value: string | null) => (value ? namesById[value] : "Choose a city")}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {cities.map((city) => (
          <SelectItem key={city.id} value={String(city.id)}>
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
