import { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: [
    // Playwright Tests
    "vst/playwright.config.ts",
    "urnerys/playwright.config.ts",

    "src/imageLoader.ts",
  ],

  ignore: ["public/**/*"],

  ignoreDependencies: [
    // Explicit dependency so it can be updated by Renovate
    "caniuse-lite",
  ],

  ignoreBinaries: [
    // Installed through Nix
    "biome",
  ],
};

export default config;
