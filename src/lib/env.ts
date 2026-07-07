export const BACKEND_URL = (process.env.BACKEND_URL || "http://localhost:3001").replace(/\/+$/, "");

/** event-backend mounts every route under this prefix (see event-backend/src/app.js). */
export const API_BASE = `${BACKEND_URL}/api/v1`;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

export const ORGANISER_APP_URL = (
  process.env.NEXT_PUBLIC_ORGANISER_APP_URL || "http://localhost:3010"
).replace(/\/+$/, "");
