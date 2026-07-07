/**
 * The backend stores/returns datetimes as naive "YYYY-MM-DD HH:MM:SS" (or
 * ISO-ish "YYYY-MM-DDTHH:MM:SS") strings that are already wall-clock IST —
 * there is no timezone offset in them. We deliberately avoid `new Date(...)`
 * for display formatting since its local-time interpretation depends on the
 * host's system timezone and would silently shift the displayed time on a
 * server that isn't running in Asia/Kolkata. Parsing the parts manually
 * keeps this correct everywhere, matching the rest of the Evento codebase's
 * "treat as literal IST" convention.
 */

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface NaiveDateTime {
  year: number;
  month: number; // 1-12
  day: number;
  hour: number;
  minute: number;
}

function parseNaive(raw: string): NaiveDateTime | null {
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/);
  if (!match) return null;
  const [, y, mo, d, h, mi] = match;
  return {
    year: Number(y),
    month: Number(mo),
    day: Number(d),
    hour: Number(h),
    minute: Number(mi),
  };
}

/** Zeller-ish day-of-week via the proleptic Gregorian calendar (no Date object). */
function dayOfWeek({ year, month, day }: NaiveDateTime): number {
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  let y = year;
  if (month < 3) y -= 1;
  return (y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + t[month - 1] + day) % 7;
}

function formatTimeOfDay({ hour, minute }: NaiveDateTime): string {
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:${String(minute).padStart(2, "0")} ${period}`;
}

export function formatWeekdayShort(raw: string): string {
  const dt = parseNaive(raw);
  if (!dt) return "";
  return WEEKDAYS[dayOfWeek(dt)].toUpperCase();
}

export function formatDayNumber(raw: string): string {
  const dt = parseNaive(raw);
  return dt ? String(dt.day).padStart(2, "0") : "";
}

export function formatMonthShort(raw: string): string {
  const dt = parseNaive(raw);
  return dt ? MONTHS[dt.month - 1] : "";
}

export function formatShortDate(raw: string): string {
  const dt = parseNaive(raw);
  if (!dt) return "";
  return `${dt.day} ${MONTHS[dt.month - 1]}`;
}

export function formatTime(raw: string): string {
  const dt = parseNaive(raw);
  return dt ? formatTimeOfDay(dt) : "";
}

/** e.g. "Sat, 12 Jul 2026 · 6:00 PM" */
export function formatFullDateTime(raw: string): string {
  const dt = parseNaive(raw);
  if (!dt) return "";
  return `${WEEKDAYS[dayOfWeek(dt)]}, ${dt.day} ${MONTHS[dt.month - 1]} ${dt.year} · ${formatTimeOfDay(dt)}`;
}

/** Combines start/end into a single human range for event detail pages. */
export function formatEventDateRange(startsAt: string, endsAt?: string | null): string {
  const start = parseNaive(startsAt);
  if (!start) return "";
  const startLabel = formatFullDateTime(startsAt);
  if (!endsAt) return startLabel;
  const end = parseNaive(endsAt);
  if (!end) return startLabel;

  const sameDay = start.year === end.year && start.month === end.month && start.day === end.day;
  if (sameDay) {
    return `${WEEKDAYS[dayOfWeek(start)]}, ${start.day} ${MONTHS[start.month - 1]} ${start.year} · ${formatTimeOfDay(start)} – ${formatTimeOfDay(end)}`;
  }
  return `${formatShortDate(startsAt)} – ${formatShortDate(endsAt)}, ${end.year}`;
}

export function isPastDate(raw: string, referenceNowIso: string): boolean {
  return raw < referenceNowIso;
}

/** Converts a naive "YYYY-MM-DD HH:MM:SS" IST wall-clock string into a
 *  proper ISO 8601 string with the +05:30 offset, for JSON-LD/meta tags
 *  that require an unambiguous instant. */
export function toIsoIst(raw: string): string | null {
  const dt = parseNaive(raw);
  if (!dt) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${dt.year}-${pad(dt.month)}-${pad(dt.day)}T${pad(dt.hour)}:${pad(dt.minute)}:00+05:30`;
}

export function priceLabel(isFree: 0 | 1 | boolean): string {
  return isFree ? "Free" : "Paid";
}

export function venueLabel(event: {
  venue_type: "physical" | "online" | "hybrid";
  venue_name: string | null;
  city_name: string | null;
}): string {
  if (event.venue_type === "online") return "Online event";
  if (event.venue_type === "hybrid") {
    return event.venue_name ? `${event.venue_name} · Hybrid` : "Hybrid event";
  }
  if (event.venue_name && event.city_name) return `${event.venue_name}, ${event.city_name}`;
  return event.venue_name || event.city_name || "Venue to be announced";
}

export function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return String(n);
}
