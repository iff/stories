import localFont from "next/font/local";

export const tuna = localFont({
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  src: [
    {
      path: "./Tuna/371F3E_3_0.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Tuna/371F3E_5_0.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./Tuna/371F3E_7_0.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Tuna/371F3E_9_0.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Tuna/371F3E_0_0.woff2",
      weight: "700",
      style: "nomal",
    },
    {
      path: "./Tuna/371F3E_1_0.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});
