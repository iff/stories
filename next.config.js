import withMDX from "@next/mdx";
import { remarkPlugin } from "@timvir/mdx";
import withPlugins from "next-compose-plugins";
import withLinaria from "next-with-linaria";

const plugins = [
  withLinaria,
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

  transpilePackages: ["timvir"],

  images: {
    loader: 'custom',
    loaderFile: './src/imageLoader.ts',
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
