import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";
import stories from "../../../content";

export interface Query extends ParsedUrlQuery {
  storyId: string;
}

interface Props {
  storyId: string;
}

function Page(props: Props) {
  const router = useRouter();

  const { storyId } = props;
  const { meta } = stories[storyId];

  React.useEffect(() => {
    router.push(`/${storyId}`);
  }, [storyId]);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta property="og:url" content={`https://stories.caurea.org/${storyId}`} />
      </Head>
      <div style={{ display: "grid", minHeight: "100vh", placeItems: "center" }}>Redirecting…</div>;
    </>
  );
}

export default Page;

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  return {
    props: {
      ...(params as any),
    },
  };
};
