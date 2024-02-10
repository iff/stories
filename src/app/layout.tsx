import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "../style.linaria.global";

export const metadata: Metadata = {
  title: "stories by iff",
};

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  viewportFit: "cover",
};

const baseUrl = process.env.NODE_ENV === "production" ? `https://iff.io` : "http://localhost:3000";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="alternate" type="application/rss+xml" title="Yves Ineichen" href={`${baseUrl}/feed`} />
      </head>

      <body>{children}</body>

      <SpeedInsights />
    </html>
  );
}
