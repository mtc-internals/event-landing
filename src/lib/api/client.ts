import { API_BASE } from "@/lib/env";

interface ApiWrap<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
}

interface FetchOpts {
  params?: Record<string, string | number | undefined | null>;
  revalidate?: number | false;
  tags?: string[];
}

/**
 * Thin server-side fetch wrapper around the event-backend public API.
 * Returns `null` on any network/HTTP failure instead of throwing, so pages
 * can render graceful empty states when the backend is unreachable rather
 * than crashing the whole route.
 */
export async function apiGet<T>(path: string, opts: FetchOpts = {}): Promise<T | null> {
  const url = new URL(`${API_BASE}${path}`);
  if (opts.params) {
    for (const [key, value] of Object.entries(opts.params)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  try {
    const res = await fetch(url.toString(), {
      next: {
        revalidate: opts.revalidate ?? 60,
        tags: opts.tags,
      },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiWrap<T>;
    if (!json.success) return null;
    return json.data;
  } catch {
    return null;
  }
}
