import * as stylex from "@stylexjs/stylex";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { tuna } from "@/fonts";

import { color } from "@/tokens.stylex";

import "../style.global.css";

export const metadata: Metadata = {
  title: "Canvas",
  description: "",
};

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  viewportFit: "cover",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { className, ...rest } = stylex.props(styles.html);

  return (
    <html lang="en" className={`${tuna.className} ${className}`} {...rest}>
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>

      <body {...stylex.props(styles.body)}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

const styles = stylex.create({
  html: {
    backgroundColor: color.background,
    color: color.text,

    colorScheme: "light dark",

    boxSizing: "border-box",

    overscrollBehavior: "none",

    textSizeAdjust: "none",
  },

  body: {
    margin: 0,

    /*
     * Font size goes from 17px to 21px, changes
     * at fixed breakpoints.
     */
    fontSize: "17px",
    lineHeight: 1.8,

    "@media (min-width: 720px) and (max-width: 1279.999px)": {
      fontSize: "19px",
      lineHeight: 1.7,
    },

    "@media (min-width: 1280px)": {
      fontSize: "21px",
      lineHeight: 1.6,
    },
  },
});
