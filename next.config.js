const visit = require("unist-util-visit");
const withLinaria = require("next-linaria");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withLinaria(
  withMDX({
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
