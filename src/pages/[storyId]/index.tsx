import { Story } from "@/components/Story";
import * as fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";

export interface Query extends ParsedUrlQuery {
  storyId: string;
}

interface Props {
  storyId: string;
  blobs: Array<any>;
}

const stories = {
  "where-i-was-meant-to-be": {
    meta: require("../../../content/where-i-was-meant-to-be/meta").default,
    Header: dynamic(() => import(`../../../content/where-i-was-meant-to-be/header`)),
    Body: dynamic(() => import(`../../../content/where-i-was-meant-to-be/body.mdx`)),
  },
  "one-more-rush": {
    meta: require("../../../content/one-more-rush/meta").default,
    Header: dynamic(() => import(`../../../content/one-more-rush/header`)),
    Body: dynamic(() => import(`../../../content/one-more-rush/body.mdx`)),
  },
  "dreamers-wake": {
    meta: require("../../../content/dreamers-wake/meta").default,
    Header: dynamic(() => import(`../../../content/dreamers-wake/header`)),
    Body: dynamic(() => import(`../../../content/dreamers-wake/body.mdx`)),
  },
  "blouson-noir": {
    meta: require("../../../content/blouson-noir/meta").default,
    Header: dynamic(() => import(`../../../content/blouson-noir/header`)),
    Body: dynamic(() => import(`../../../content/blouson-noir/body.mdx`)),
  },
} as const;

export default function Page(props: Props) {
  const { storyId, blobs } = props;

  return <Story storyId={storyId} blobs={blobs} {...stories[storyId]} />;
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  const body = await fs.promises.readFile(`./content/${params.storyId}/body.mdx`, { encoding: "utf8" });
  const root = unified().use(remarkParse).use(remarkMdx).parse(body);

  const blobIds: Array<string> = [];
  function go(node) {
    if (node.children) {
      node.children.forEach(go);
    }

    if ((node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") && node.name === "Image") {
      const blobId = node.attributes.find((x) => x.type === "mdxJsxAttribute" && x.name === "blobId")?.value;
      if (blobId) {
        blobIds.push(blobId);
      }
    }
    if ((node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") && node.name === "Clip") {
      const blobId = node.attributes.find((x) => x.type === "mdxJsxAttribute" && x.name === "blobId")?.value;
      if (blobId) {
        blobIds.push(blobId);
      }
    }
  }

  go(root);

  const blobs = await (async () => {
    if (blobIds.length === 0) {
      return [];
    }

    const res = await fetch("https://web-4n62l3bdha-lz.a.run.app/api", {
      method: "POST",
      headers: { ["Content-Type"]: "application/json" },
      body: JSON.stringify({
        query: `query { ${blobIds.map(
          (blobId) =>
            `b${blobId}: blob(name: "${blobId}") {
              name
              asImage { url dimensions { width height } placeholder { url } }
              asVideo { poster { url dimensions { width height } placeholder { url } } renditions { url } }
            }`
        )} }`,
      }),
    });
    const json = await res.json();

    return Object.values(json.data);
  })();

  return {
    props: {
      ...params,
      blobs,
    },
  };
};
