import { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: [
    "src/imageLoader.ts",

    "src/graphql/index.ts",
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
