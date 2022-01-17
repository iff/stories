import { Story } from "@/components/Story";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";

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
  const Body = require(`../../../content/${params.storyId}/body.mdx`).default;
  const { children } = Body({}).props;

  const blobIds: Array<string> = [];
  React.Children.forEach(children, function go(child: any) {
    if (React.isValidElement(child)) {
      const props = child.props as any;

      if (props.mdxType === "Image" && props.blobId) {
        blobIds.push(props.blobId);
      } else if (props.mdxType === "Clip" && props.blobId) {
        blobIds.push(props.blobId);
      }

      React.Children.forEach(props.children, go);
    }
  });

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
