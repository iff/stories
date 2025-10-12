import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";
import * as unist from "unist";
import { graphql } from "@/graphql";
import { BlobQuery } from "@/graphql/graphql";

/**
 * A Block is an element in a story which is not self-contained.
 * It requires data to be fetched from an external source.
 */
export type Block = Image | Clip;

interface Image {
  __typename: "Image";
  id: string;
  caption?: string;
}

interface Clip {
  __typename: "Clip";
  id: string;
  caption?: string;
}

export function extractBlocks(mdx: string): Array<Block> {
  const blocks: Array<Block> = [];

  function go(
    node: unist.Node &
      Partial<unist.Parent> & { name?: string; attributes?: Array<{ type: string; name: string; value?: string }> },
  ) {
    if (Array.isArray(node.children)) {
      node.children.forEach(go);
    }

    if ((node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") && node.name === "Image") {
      const blobId = node.attributes?.find((x) => x.type === "mdxJsxAttribute" && x.name === "blobId")?.value;
      const caption = node.attributes?.find((x) => x.type === "mdxJsxAttribute" && x.name === "caption")?.value;

      if (blobId) {
        blocks.push({
          __typename: "Image",
          id: blobId,
          caption,
        });
      }
    }

    if ((node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") && node.name === "Clip") {
      const blobId = node.attributes?.find((x) => x.type === "mdxJsxAttribute" && x.name === "blobId")?.value;
      const caption = node.attributes?.find((x) => x.type === "mdxJsxAttribute" && x.name === "caption")?.value;

      if (blobId) {
        blocks.push({
          __typename: "Clip",
          id: blobId,
          caption,
        });
      }
    }
  }

  go(unified().use(remarkParse).use(remarkMdx).parse(mdx));

  return blocks;
}

async function importBlob(name: string) {
  const BlobQuery = graphql(`
    query Blob($name: String!) {
      blob(name: $name) {
        id
        name

        asImage {
          url
          dimensions {
            width
            height
          }
          placeholder {
            url
          }
        }

        asVideo {
          poster {
            url
            dimensions {
              width
              height
            }
            placeholder {
              url
            }
          }
          renditions {
            url

            dimensions {
              width
              height
            }
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
      query: BlobQuery,
      variables: {
        name,
      },
    }),
  });

  const json = (await res.json()) as { data: BlobQuery };
  if (!json.data.blob) {
    throw new Error(`Blob ${name} not found`);
  }

  return json.data.blob;
}

export async function importImage(name: string) {
  const blob = await importBlob(name);
  if (!blob.asImage) {
    throw new Error(`Blob ${name} not Image`);
  }

  return {
    ...blob,
    asImage: blob.asImage,
  };
}

export async function importVideo(name: string) {
  const blob = await importBlob(name);
  if (!blob.asVideo) {
    throw new Error(`Blob ${name} not Video`);
  }

  return {
    ...blob,
    asVideo: blob.asVideo,
  };
}

export function blockIdSelector(blockId: string) {
  return `b-${blockId}`;
}
