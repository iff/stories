import { defineConfig } from "@playwright/test";

export default defineConfig({
  reporter: [["list"]],

  timeout: 5 * 60 * 1000,
  retries: 3,

  fullyParallel: true,

  use: {
    baseURL: process.env.URL ?? "http://localhost:3000",
    trace: "on",
    screenshot: "only-on-failure",

    extraHTTPHeaders: {
      "x-vercel-skip-toolbar": "1",
    },
  },
});
