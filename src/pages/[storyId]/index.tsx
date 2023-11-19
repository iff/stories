import { extractBlocks } from "@/cms";
import { Story } from "@/components/Story";
import * as fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { ParsedUrlQuery } from "querystring";
import stories from "../../../content";

export interface Query extends ParsedUrlQuery {
  storyId: string;
}

interface Props {
  storyId: string;
  blobs: Array<any>;
}

export default function Page(props: Props) {
  const { storyId, blobs } = props;

  if (storyId in stories) {
    return <Story storyId={storyId} blobs={blobs} {...stories[storyId]} />;
  }

  return (
    <Story
      storyId={storyId}
      blobs={blobs}
      meta={{}}
      Header={dynamic(() => import(`../../../content/${storyId}/header`))}
      Body={dynamic(() => import(`../../../content/${storyId}/body.mdx`))}
    />
  );
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  if (!fs.existsSync(`./content/${params.storyId}/body.mdx`)) {
    return {
      notFound: true,
    };
  }

  const body = await fs.promises.readFile(`./content/${params.storyId}/body.mdx`, { encoding: "utf8" });
  const blocks = extractBlocks(body);

  const blobs = await (async () => {
    if (blocks.length === 0) {
      return [];
    }

    const res = await fetch(`${process.env.API}/graphql`, {
      method: "POST",
      headers: { ["Content-Type"]: "application/json" },
      body: JSON.stringify({
        query: `query { ${blocks.map(
          ({ id }) =>
            `b${id}: blob(name: "${id}") {
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
