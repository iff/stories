import { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: [
    // Playwright Tests
    "vst/playwright.config.ts",
    "urnerys/playwright.config.ts",

    // Next.js MDX support
    "mdx-components.tsx",
  ],

  ignore: ["public/**/*"],

  ignoreDependencies: [
    // Explicit dependency so it can be updated by Renovate
    "caniuse-lite",
  ],
};

export default config;
