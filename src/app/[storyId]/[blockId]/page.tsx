import { extractBlocks } from "@/cms";
import { Clip } from "@/components/Clip";
import { Lightbox } from "@/components/Lightbox";
import { css } from "@linaria/core";
import * as fs from "fs";
import Head from "next/head";
import NextImage from "next/image";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";

export interface Query extends ParsedUrlQuery {
  storyId: string;
  blockId: string;
}

interface Props {
  params: {
    storyId: string;
    blockId: string;
  };
}

interface Data {
  block: Block;

  next: null | string;
  prev: null | string;

  title?: string;

  blob?: any;
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
      video: any;
      caption: null | string;
    };

export default async function Page(props: Props) {
  const { storyId } = props.params;
  const { block, next, prev, title, blob } = await data(props.params);

  const image = block.__typename === "Image" ? block.image : block.video?.poster;

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta property="og:title" content={title} />
        {block.caption && <meta property="og:description" content={block.caption} />}
        <meta property="og:image" content={image.src} />

        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Lightbox
        onClose={{ href: `/${storyId}` }}
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
    await import(`../../../../content/${storyId}/body.mdx`);
    const body = await fs.promises.readFile(`content/${storyId}/body.mdx`, { encoding: "utf8" });

    let blobP: Promise<any> = Promise.resolve({});
    const blocks = extractBlocks(body);

    const block = blocks.find((x) => x.id === blockId);
    if (block) {
      blobP = (async () => {
        const res = await fetch(`${process.env.API}/graphql`, {
          method: "POST",
          headers: { ["Content-Type"]: "application/json" },
          body: JSON.stringify({
            query: `query {
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
  const index = blocks.indexOf(block!);

  const { title } = require(`../../../../content/${storyId}/meta`).default;

  return {
    block: {
      ...block,
      caption: block!.caption ?? null,
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

    title: `${blockId} - ${title}`,

    blob,
  };
}

const Inner = {
  Image: function ({ blob }: { blob: any }) {
    return (
      <div>
        <NextImage
          alt=""
          src={blob.asImage.url}
          fill
          sizes="100vw"
          style={{
            objectFit: "contain",
          }}
        />
        <div
          className={css`
            position: absolute;
            inset: 0;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            pointer-events: none;

            background-repeat: no-repeat;
            background-size: contain;
            background-position: 50% 50%;

            z-index: -1;
          `}
          style={{
            backgroundImage: `url(${blob.asImage.placeholder.url})`,
          }}
        />
      </div>
    );
  },
  Clip: function ({ video }: { video: any }) {
    return (
      <div
        className={css`
          height: 100%;
          display: grid;
          place-items: center;
        `}
      >
        <Clip video={video} />
      </div>
    );
  },
} as const;
