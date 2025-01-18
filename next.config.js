import withMDX from "@next/mdx";
import { remarkPlugin } from "@timvir/mdx";
import withLinaria from "next-with-linaria";
import stylexPlugin from "@stylexswc/nextjs-plugin";
import * as path from "node:path";

const rootDir = new URL(".", import.meta.url).pathname;

function withPlugins(plugins, config) {
  return plugins.reduce((a, f) => f(a), config);
}

const plugins = [
  withLinaria,
  withMDX({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [remarkPlugin],
    },
  }),
  stylexPlugin({
    rsOptions: {
      dev: process.env.NODE_ENV !== "production",
      aliases: {
        "@/*": [path.join(rootDir, "src/", "*")],
      },
      unstable_moduleResolution: {
        type: "commonJS",
        rootDir,
      },
    },
  }),
];

export default withPlugins(plugins, {
  reactStrictMode: true,

  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  transpilePackages: ["timvir"],

  images: {
    loader: "custom",
    loaderFile: "./src/imageLoader.ts",
  },

  env: {
    API: process.env.API,
  },

  async rewrites() {
    return [
      {
        source: "/feed",
        destination: "/api/feed",
      },
    ];
  },
});
