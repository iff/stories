import { KnipConfig } from "knip";

const config: KnipConfig = {
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
