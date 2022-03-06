import withLinaria from "next-linaria";
import withMDX from "@next/mdx";

export default withLinaria(
  withMDX({
    extension: /\.mdx?$/,
  })({
    linaria: {
      cacheDirectory: "./.next/cache/linaria",
    },

    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

    images: {
      domains: ["storage.googleapis.com", "web-4n62l3bdha-lz.a.run.app"],
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
