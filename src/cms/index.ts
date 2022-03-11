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

  function go(node: unist.Node & unist.Parent & { name: string; attributes: any[] }) {
    if (Array.isArray(node.children)) {
      node.children.forEach(go);
    }

    if ((node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") && node.name === "Image") {
      const blobId = node.attributes.find((x) => x.type === "mdxJsxAttribute" && x.name === "blobId")?.value;
      const caption = node.attributes.find((x) => x.type === "mdxJsxAttribute" && x.name === "caption")?.value;

      if (blobId) {
        blocks.push({
          __typename: "Image",
          id: blobId,
          caption,
        });
      }
    }
    if ((node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") && node.name === "Clip") {
      const blobId = node.attributes.find((x) => x.type === "mdxJsxAttribute" && x.name === "blobId")?.value;
      const caption = node.attributes.find((x) => x.type === "mdxJsxAttribute" && x.name === "caption")?.value;

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
  go(root as any);

  return blocks;
}
