import * as fs from "node:fs";
import { lookupStory } from "content";
import { Metadata } from "next";
import Head from "next/head";
import NextImage, { getImageProps } from "next/image";
import { notFound } from "next/navigation";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { blockIdSelector, extractBlocks } from "@/cms";
import { Clip } from "@/components/Clip";
import { Lightbox } from "@/components/Lightbox";
import { graphql } from "@/graphql";
import { BlockQuery } from "@/graphql/graphql";

export async function generateStaticParams() {
  return [];
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

  next: null | NonNullable<BlockQuery["blob"]>;
  prev: null | NonNullable<BlockQuery["blob"]>;

  title?: string;

  blob: NonNullable<BlockQuery["blob"]>;
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

  if (prev) {
    preloadBlob(prev);
  }
  if (next) {
    preloadBlob(next);
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Lightbox
        onClose={{ href: `/${storyId}#${blockIdSelector(blockId)}` }}
        caption={block.caption}
        prev={prev ? { href: `/${storyId}/${prev.name}` } : undefined}
        next={next ? { href: `/${storyId}/${next.name}` } : undefined}
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

function preloadBlob(blob: NonNullable<BlockQuery["blob"]>) {
  if (blob.asImage) {
    const { props } = getImageProps({
      alt: "",
      src: blob.asImage.url,
      width: blob.asImage.dimensions.width,
      height: blob.asImage.dimensions.height,
      sizes: "100vw",
    });

    ReactDOM.preload(blob.asImage.url, {
      as: "image",
      imageSrcSet: props.srcSet,
      imageSizes: props.sizes,
      fetchPriority: "low",
    });
  }
}

async function fetchBlob(name: string): Promise<NonNullable<BlockQuery["blob"]>> {
  const BlockQuery = graphql(`
    query Block($name: String!) {
      blob(name: $name) {
        name

        asImage {
          url
          dimensions { width height }
          placeholder { url }
        }

        asVideo {
          poster {
            url
            dimensions { width height }
            placeholder { url }
          }
          renditions {
            url
          }
        }
      }
    }
  `);

  const res = await fetch(`${process.env.API}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: BlockQuery,
      variables: {
        name,
      },
    }),
  });

  const json = (await res.json()) as { data: BlockQuery };
  if (!json.data.blob) {
    notFound();
  }

  return json.data.blob;
}

async function data({ storyId, blockId }: { storyId: string; blockId: string }): Promise<Data> {
  const story = await lookupStory(storyId);
  if (!story) {
    notFound();
  }

  const body = await fs.promises.readFile(`content/${storyId}/body.mdx`, { encoding: "utf8" });
  const blocks = extractBlocks(body);

  const block = blocks.find((x) => x.id === blockId);
  if (!block) {
    notFound();
  }

  const index = blocks.indexOf(block);

  const [blob, prev, next] = await Promise.all([
    fetchBlob(block.id),
    blocks[index - 1]?.id ? fetchBlob(blocks[index - 1].id) : null,
    blocks[index + 1]?.id ? fetchBlob(blocks[index + 1].id) : null,
  ]);

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

    prev,
    next,

    title: `${blockId} - ${story?.title}`,

    blob,
  };
}

const Inner = {
  Image: ({ blob }: { blob: NonNullable<BlockQuery["blob"]> }) =>
    blob.asImage ? (
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
    ) : null,
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
