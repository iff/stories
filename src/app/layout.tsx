import type { Metadata, Viewport } from "next";

import "../style.linaria.global";

export const metadata: Metadata = {
  title: "Stories by Tomáš Čarnecky",
};

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  viewportFit: "cover",
};

const baseUrl = process.env.NODE_ENV === "production" ? `https://stories.caurea.org` : "http://localhost:3000";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="alternate" type="application/rss+xml" title="Stories by Tomáš Čarnecky" href={`${baseUrl}/feed`} />
      </head>

      <body>{children}</body>
    </html>
  );
}
