import * as fs from "node:fs";
import { ParsedUrlQuery } from "node:querystring";
import { lookupStory } from "content";
import { Metadata } from "next";
import Head from "next/head";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import * as React from "react";
import { extractBlocks } from "@/cms";
import { Clip } from "@/components/Clip";
import { Lightbox } from "@/components/Lightbox";

export async function generateStaticParams() {
  return [];
}

export interface Query extends ParsedUrlQuery {
  storyId: string;
  blockId: string;
}

interface Params {
  storyId: string;
  blockId: string;
}

interface Props {
  params: Promise<Params>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { storyId, blockId } = await props.params;
  const { block } = await data({ storyId, blockId });

  const image = block.__typename === "Image" ? block.image : block.video?.poster;

  return {
    title: block.caption,
    openGraph: {
      images: "src" in image ? image.src : image.url,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

interface Data {
  block: Block;

  next: null | string;
  prev: null | string;

  title?: string;

  blob: { name: string; asImage: { url: string; placeholder: { url: string } } };
}

type Block =
  | {
      __typename: "Image";
      id: string;
      image: { src: string; sqip: { src: string } };
      caption: null | string;
    }
  | {
      __typename: "Clip";
      id: string;
      video: NonNullable<React.ComponentProps<typeof Clip>["video"]>;
      caption: null | string;
    };

export default async function Page(props: Props) {
  const { storyId, blockId } = await props.params;
  const { block, next, prev, title, blob } = await data({ storyId, blockId });

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Lightbox
        onClose={{ href: `/${storyId}?focus=${blockId}` }}
        caption={block.caption}
        prev={prev ? { href: `/${storyId}/${prev}` } : undefined}
        next={next ? { href: `/${storyId}/${next}` } : undefined}
      >
        {(() => {
          switch (block.__typename) {
            case "Image":
              return <Inner.Image key={block.id} blob={blob} />;
            case "Clip":
              return <Inner.Clip key={block.id} video={block.video} />;
          }
        })()}
      </Lightbox>
    </>
  );
}

async function data({ storyId, blockId }: { storyId: string; blockId: string }): Promise<Data> {
  /*
   * Extract information from the story content:
   *
   *  - An ordered list of all blocks. This is required to determine the
   *    previous and next block IDs.
   *  - Informtion about the selected block fetched from the media distribution
   *    system.
   */
  const { blocks, blob } = await (async () => {
    const body = await fs.promises.readFile(`content/${storyId}/body.mdx`, { encoding: "utf8" });

    let blobP: Promise<{
      name: string;
      asImage: { url: string; dimensions: { width: number; height: number }; placeholder: { url: string } };
      asVideo: {
        poster: { url: string; dimensions: { width: number; height: number }; placeholder: { url: string } };
        renditions: Array<{ url: string }>;
      };
    }> = Promise.resolve(
      {} as {
        name: string;
        asImage: { url: string; dimensions: { width: number; height: number }; placeholder: { url: string } };
        asVideo: {
          poster: { url: string; dimensions: { width: number; height: number }; placeholder: { url: string } };
          renditions: Array<{ url: string }>;
        };
      },
    );
    const blocks = extractBlocks(body);

    const block = blocks.find((x) => x.id === blockId);
    if (block) {
      blobP = (async () => {
        const res = await fetch(`${process.env.API}/graphql`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `query Block {
                blob(name: "${block.id}") {
                  name
                  asImage { url dimensions { width height } placeholder { url } }
                  asVideo { poster { url dimensions { width height } placeholder { url } } renditions { url } }
                }
              }`,
          }),
        });

        const json = await res.json();

        return json.data.blob;
      })();
    }

    return { blocks, blob: await blobP };
  })();

  const block = blocks.find((x) => x.id === blockId);
  if (!block) {
    return notFound();
  }

  const index = blocks.indexOf(block);

  const story = await lookupStory(storyId);

  return {
    block: {
      ...block,
      caption: block.caption ?? null,
      ...(() => {
        if ("asImage" in blob && blob.asImage) {
          return {
            image: {
              src: blob.asImage.url,
              ...blob.asImage.dimensions,
              sqip: {
                src: blob.asImage.placeholder.url,
              },
            },
          };
        }

        if ("asVideo" in blob && blob.asVideo) {
          return { video: blob.asVideo };
        }

        return {};
      })(),
    } as Block,

    prev: blocks[index - 1]?.id ?? null,
    next: blocks[index + 1]?.id ?? null,

    title: `${blockId} - ${story?.title}`,

    blob,
  };
}

const Inner = {
  Image: ({ blob }: { blob: { asImage: { url: string; placeholder: { url: string } } } }) => (
    <>
      <NextImage
        alt=""
        src={blob.asImage.url}
        fill
        sizes="100vw"
        style={{
          objectFit: "contain",
        }}
        priority
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          pointerEvents: "none",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "50% 50%",
          zIndex: -1,
          backgroundImage: `url(${blob.asImage.placeholder.url})`,
        }}
      />
    </>
  ),
  Clip: ({ video }: { video: React.ComponentProps<typeof Clip>["video"] }) => (
    <div
      style={{
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Clip video={video} />
    </div>
  ),
} as const;
