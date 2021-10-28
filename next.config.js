const visit = require("unist-util-visit");
const withLinaria = require("next-linaria");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      () => (tree) => {
        visit(tree, "jsx", (node) => {
          if (node.value.match(/<Image/)) {
            node.value = node.value.replace(/src="([^"]*)"/g, (...args) => `image={importImage("${args[1]}")}`);
          }
        });
      },
    ],
  },
});

module.exports = withLinaria(
  withMDX({
    linaria: {
      cacheDirectory: "./.next/cache/linaria",
    },

    typescript: {
      ignoreBuildErrors: true,
    },

    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

    images: {
      domains: ["storage.googleapis.com"],
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
