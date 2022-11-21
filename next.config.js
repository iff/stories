import withMDX from "@next/mdx";
import { remarkPlugin } from "@timvir/mdx";
import withPlugins from "next-compose-plugins";
import { withLinaria } from "./next/withLinaria.js";

const plugins = [
  withLinaria({
    cacheDirectory: "./.next/cache/linaria",
  }),
  withMDX({
    extension: /\.mdx?$/,
    options: {
      providerImportSource: "@mdx-js/react",
      remarkPlugins: [remarkPlugin],
    },
  }),
];

export default withPlugins(plugins, {
  reactStrictMode: true,

  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  images: {
    domains: ["storage.googleapis.com", "web-4n62l3bdha-lz.a.run.app"],
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
