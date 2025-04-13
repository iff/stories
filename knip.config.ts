import { KnipConfig } from "knip";

const config: KnipConfig = {
  // Too many issues with these rules to have them enabled at this time
  exclude: ["exports"],

  entry: [
    // Visual Smoke Test
    "vst/playwright.config.ts",

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
