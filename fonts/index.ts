import localFont from "next/font/local";

export const iaWriterQuattroS = localFont({
  display: "swap",
  fallback: ["monospace"],
  src: [
    {
      path: "./iAWriterQuattroS/iAWriterQuattroS-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./iAWriterQuattroS/iAWriterQuattroS-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});
