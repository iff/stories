import withLinaria from "next-linaria";
import withMDX from "@next/mdx";
import { remarkPlugin } from "@timvir/mdx";

export default withLinaria(
  withMDX({
    extension: /\.mdx?$/,
    options: {
      providerImportSource: "@mdx-js/react",
      remarkPlugins: [remarkPlugin],
    },
  })({
    linaria: {
      cacheDirectory: "./.next/cache/linaria",
    },

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
  })
);