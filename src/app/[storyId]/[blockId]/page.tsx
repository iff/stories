import assert from "node:assert";
import * as fs from "node:fs";
import { lookupStory } from "content";
import { Metadata } from "next";
import NextImage, { getImageProps } from "next/image";
import { notFound } from "next/navigation";
import * as ReactDOM from "react-dom";
import { Block, blockIdSelector, extractBlocks } from "@/cms";
import { Clip } from "@/components/Clip";
import { Lightbox } from "@/components/Lightbox";
import { execute, graphql, StoryBlockPageQuery, StoryBlockPageSiblingQuery } from "@/graphql";

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
  const { title, blob } = await data({ storyId, blockId });

  return {
    title,
    openGraph: {
      images: (() => {
        if (blob.asImage) {
          return blob.asImage.url;
        } else if (blob.asVideo?.poster) {
          return blob.asVideo.poster.url;
        }
      })(),
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function Page(props: Props) {
  const { storyId, blockId } = await props.params;
  const { block, next, prev, blob } = await data({ storyId, blockId });

  if (prev) {
    preloadBlockSibling(prev);
  }
  if (next) {
    preloadBlockSibling(next);
  }

  return (
    <Lightbox
      onClose={{ href: `/${storyId}#${blockIdSelector(blockId)}` }}
      caption={block.caption}
      prev={prev ? { href: `/${storyId}/${prev.name}` } : undefined}
      next={next ? { href: `/${storyId}/${next.name}` } : undefined}
    >
      {(() => {
        switch (block.__typename) {
          case "Image": {
            assert(blob.asImage);

            return (
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
            );
          }

          case "Clip": {
            assert(blob.asVideo);

            return (
              <div
                style={{
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Clip video={blob.asVideo} />
              </div>
            );
          }
        }
      })()}
    </Lightbox>
  );
}

function preloadBlockSibling(blob: NonNullable<StoryBlockPageSiblingQuery["blob"]>) {
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

async function fetchBlockData(name: string) {
  const StoryBlockPageQuery = graphql(`
    query StoryBlockPage($name: String!) {
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
            dimensions { width height }
          }
        }
      }
    }
  `);

  const { data } = await execute(StoryBlockPageQuery, { name });
  if (!data || !data.blob) {
    notFound();
  }

  return data.blob;
}

async function fetchBlockSiblingData(name: string) {
  const BlockSiblingQuery = graphql(`
    query StoryBlockPageSibling($name: String!) {
      blob(name: $name) {
        name

        asImage {
          url
          dimensions { width height }
        }

        asVideo {
          poster {
            url
            dimensions { width height }
          }
        }
      }
    }
  `);

  const { data } = await execute(BlockSiblingQuery, { name });
  if (!data || !data.blob) {
    throw new Error("Block Sibling Not Found");
  }

  return data.blob;
}

interface Data {
  block: Block;

  blob: NonNullable<StoryBlockPageQuery["blob"]>;
  title: string;

  next: null | NonNullable<StoryBlockPageSiblingQuery["blob"]>;
  prev: null | NonNullable<StoryBlockPageSiblingQuery["blob"]>;
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
    fetchBlockData(block.id),
    blocks[index - 1]?.id ? fetchBlockSiblingData(blocks[index - 1].id) : null,
    blocks[index + 1]?.id ? fetchBlockSiblingData(blocks[index + 1].id) : null,
  ]);

  return {
    block,

    blob,
    title: `${blockId} - ${story.title}`,

    prev,
    next,
  };
}
