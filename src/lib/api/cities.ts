import { apiGet } from "@/lib/api/client";
import type { City } from "@/types/event";

export async function getCities(params: { search?: string; limit?: number } = {}): Promise<City[]> {
  const data = await apiGet<{ cities: City[]; total: number }>("/system/cities", {
    params: { search: params.search ?? "", limit: params.limit ?? 50 },
    revalidate: 3600,
    tags: ["cities"],
  });
  return data?.cities ?? [];
}
