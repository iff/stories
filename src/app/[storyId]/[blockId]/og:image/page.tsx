import { extractBlocks } from "@/cms";
import NextImage from "next/image";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";
import * as fs from "fs";
import { notFound } from "next/navigation";

export interface Query extends ParsedUrlQuery {
  storyId: string;
  blockId: string;
}

interface Props {
  params: Promise<{
    storyId: string;
    blockId: string;
  }>;
}

export default async function Page(props: Props) {
  const { storyId, blockId } = await props.params;
  const block = await data({ storyId, blockId });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
      }}
    >
      <NextImage
        alt=""
        src={block.image.src}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
}

type Block = { __typename: "Image"; id: string; image: { src: string; sqip: { src: string } }; caption: null | string };

async function data({ storyId, blockId }): Promise<Block> {
  const body = await fs.promises.readFile(`content/${storyId}/body.mdx`, { encoding: "utf8" });

  const blocks = extractBlocks(body);
  const block = blocks.find((x) => x.id === blockId);
  if (!block) {
    return notFound();
  }

  const blob = await (async () => {
    const res = await fetch(`${process.env.API}/graphql`, {
      method: "POST",
      headers: { ["Content-Type"]: "application/json" },
      body: JSON.stringify({
        query: `query OpenGraphImage {
            blob(name: "${blockId}") {
              name
              asImage { url dimensions { width height } placeholder { url } }
            }
          }`,
      }),
    });

    const json = await res.json();

    return json.data.blob;
  })();

  return {
    __typename: "Image",
    id: blockId,
    image: {
      src: blob.asImage.url,
      sqip: blob.asImage.placeholder.url,
    },
    caption: null,
  } as Block;
}
