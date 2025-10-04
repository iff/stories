import * as fs from "node:fs";
import { ParsedUrlQuery } from "node:querystring";
import * as stylex from "@stylexjs/stylex";
import { lookupStory } from "content";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { extractBlocks, importBlob } from "@/cms";
import { Body } from "@/components/Body";
import { Header } from "@/components/Header";
import { StoryById } from "@/components/Story";

export async function generateStaticParams() {
  return [];
}

export interface Query extends ParsedUrlQuery {
  storyId: string;
}

interface Params {
  storyId: string;
}

interface Props {
  params: Promise<Params>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { storyId } = await props.params;

  const story = await lookupStory(storyId);
  if (!story) {
    return {};
  }

  const blob = await importBlob(story.image);

  return {
    title: story.title,
    openGraph: {
      images: blob.asImage.url,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function Page(props: Props) {
  const { storyId } = await props.params;

  const story = await lookupStory(storyId);
  if (!story) {
    return notFound();
  }

  const blobs = await data({ storyId });

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

async function data({ storyId }: Params): Promise<
  Array<{
    name: string;

    asImage: {
      url: string;

      dimensions: {
        width: number;
        height: number;
      };

      placeholder?: {
        url: string;
      };
    };

    asVideo: {
      poster: {
        url: string;

        dimensions: {
          width: number;
          height: number;
        };

        placeholder: {
          url: string;
        };
      };

      renditions: Array<{ url: string; dimensions: { width: number; height: number } }>;
    };
  }>
> {
  if (!fs.existsSync(`./content/${storyId}/body.mdx`)) {
    return notFound();
  }

  const body = await fs.promises.readFile(`./content/${storyId}/body.mdx`, { encoding: "utf8" });
  const blocks = extractBlocks(body);

  if (blocks.length === 0) {
    return [];
  }

  const res = await fetch(`${process.env.API}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

  return Object.values(json.data) as Array<{
    name: string;

    asImage: {
      url: string;

      dimensions: {
        width: number;
        height: number;
      };

      placeholder?: {
        url: string;
      };
    };

    asVideo: {
      poster: {
        url: string;

        dimensions: {
          width: number;
          height: number;
        };

        placeholder: {
          url: string;
        };
      };

      renditions: Array<{ url: string; dimensions: { width: number; height: number } }>;
    };
  }>;
}
