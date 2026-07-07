import type { NextConfig } from "next";

const backendUrl = new URL(process.env.BACKEND_URL || "http://localhost:3001");
const backendIsLocal = ["localhost", "127.0.0.1", "[::1]"].includes(backendUrl.hostname);

const nextConfig: NextConfig = {
  images: {
    // Next 16's image optimizer refuses to fetch from loopback/private IPs
    // (SSRF protection) — required for local dev where event-backend runs on
    // localhost. Only enabled when BACKEND_URL is actually a loopback host,
    // so production deployments keep the protection.
    dangerouslyAllowLocalIP: backendIsLocal,
    remotePatterns: [
      // event-backend serves uploads via app.use('/public', express.static(...)),
      // so image URLs look like http://<backend>/public/uploads/...
      {
        protocol: backendUrl.protocol.replace(":", "") as "http" | "https",
        hostname: backendUrl.hostname,
        port: backendUrl.port || undefined,
        pathname: "/public/uploads/**",
      },
      // event-backend's /system/featured-events falls back to these stock
      // Cloudinary images when an event has no banner_url of its own.
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
