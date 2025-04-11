import * as stylex from "@stylexjs/stylex";
import * as React from "react";

import { extractBlocks, importBlob } from "@/cms";
import { StoryById } from "@/components/Story";
import * as fs from "fs";
import { ParsedUrlQuery } from "querystring";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { stories } from "content";
import { Header } from "@/components/Header";
import { Body } from "@/components/Body";

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { storyId } = await props.params;
  const story = stories.find((x) => x.id === storyId);
  if (!story) {
    return {};
  }

  return {
    title: story.title,
    openGraph: {
      images: `https://app-gcsszncmzq-lz.a.run.app/og/${process.env.VERCEL_URL}/${storyId}/og:image`,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export interface Query extends ParsedUrlQuery {
  storyId: string;
}

interface Props {
  params: Promise<{
    storyId: string;
  }>;
}

export default async function Page(props: Props) {
  const { storyId } = await props.params;
  const blobs = await data({ storyId });

  const story = stories.find((x) => x.id === storyId);
  if (!story) {
    return notFound();
  }

  return (
    <>
      <div {...stylex.props(styles.root)}>
        <Header blob={await importBlob(story.image)} title={story.title} />
        <Body storyId={storyId} blobs={blobs} Component={story.body.Component} />
      </div>

      <StoryById />
    </>
  );
}

const styles = stylex.create({
  root: {
    display: "grid",
    gap: "2em",
    marginBottom: "10vh",
  },
});

async function data({ storyId }): Promise<Array<any>> {
  if (!fs.existsSync(`./content/${storyId}/body.mdx`)) {
    return notFound();
  }

  const body = await fs.promises.readFile(`./content/${storyId}/body.mdx`, { encoding: "utf8" });
  const blocks = extractBlocks(body);

  const blobs = await (async () => {
    if (blocks.length === 0) {
      return [];
    }

    const res = await fetch(`${process.env.API}/graphql`, {
      method: "POST",
      headers: { ["Content-Type"]: "application/json" },
      body: JSON.stringify({
        query: `query Story { ${blocks.map(
          ({ id }) =>
            `b${id}: blob(name: "${id}") {
              name
              asImage { url dimensions { width height } }
              asVideo { poster { url dimensions { width height } placeholder { url } } renditions { url } }
            }`,
        )} }`,
      }),
    });
    const json = await res.json();

    return Object.values(json.data);
  })();

  return blobs;
}
