import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";
import * as unist from "unist";

type Block =
  | {
      __typename: "Image";
      id: string;
      caption?: string;
    }
  | {
      __typename: "Clip";
      id: string;
      caption?: string;
    };

export function extractBlocks(mdx: string): Array<Block> {
  const blocks: Array<Block> = [];

  function go(
    node: unist.Node &
      unist.Parent & { name?: string; attributes?: Array<{ type: string; name: string; value?: string }> },
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

  const root = unified().use(remarkParse).use(remarkMdx).parse(mdx);
  go(root);

  return blocks;
}

export async function importBlob(name: string) {
  const res = await fetch(`${process.env.API}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query Blob { blob(name: "${name}") { id name asImage { url dimensions { width height } placeholder { url } } asVideo { poster { url dimensions { width height } placeholder { url } } renditions { url } } } }`,
    }),
  });
  const json = await res.json();
  return json.data.blob;
}
