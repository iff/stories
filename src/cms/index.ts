import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";
import * as unist from "unist";
import { execute, graphql } from "@/graphql";

/**
 * A Block is an element in a story which is not self-contained.
 * It requires data to be fetched from an external source.
 */
export type Block = Image | Clip;

export type ContentBlock = Image | Clip | TextBlock | ImageGroup;

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

export interface TextBlock {
  __typename: "TextBlock";
  id: string;
  content: string;
}

export interface ImageGroup {
  __typename: "ImageGroup";
  id: string;
  images: Array<{
    id: string;
    caption?: string;
    span?: number[];
    aspectRatio?: number;
  }>;
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

export function extractContentBlocks(mdx: string): Array<ContentBlock> {
  const contentBlocks: Array<ContentBlock> = [];
  let textBlockId = 0;
  let groupId = 0;

  function extractText(node: any): string {
    if (node.type === "text") {
      return node.value;
    }
    if (node.type === "strong") {
      return `**${node.children?.map(extractText).join("") || ""}**`;
    }
    if (node.type === "emphasis") {
      return `*${node.children?.map(extractText).join("") || ""}*`;
    }
    if (node.type === "link") {
      const text = node.children?.map(extractText).join("") || "";
      return `[${text}](${node.url || ""})`;
    }
    if (node.children) {
      return node.children.map(extractText).join("");
    }
    return "";
  }

  function extractImageData(node: any) {
    const blobId = node.attributes?.find((x: any) => x.type === "mdxJsxAttribute" && x.name === "blobId")?.value;
    const caption = node.attributes?.find((x: any) => x.type === "mdxJsxAttribute" && x.name === "caption")?.value;
    const spanAttr = node.attributes?.find((x: any) => x.type === "mdxJsxAttribute" && x.name === "span");
    const aspectRatioAttr = node.attributes?.find((x: any) => x.type === "mdxJsxAttribute" && x.name === "aspectRatio");

    let span: number[] | undefined;
    let aspectRatio: number | undefined;

    // Try to extract span and aspectRatio from expression values
    if (spanAttr?.value?.type === "mdxJsxAttributeValueExpression") {
      const spanStr = spanAttr.value.value;
      try {
        span = eval(spanStr);
      } catch (e) {
        // Ignore
      }
    }

    if (aspectRatioAttr?.value?.type === "mdxJsxAttributeValueExpression") {
      const ratioStr = aspectRatioAttr.value.value;
      try {
        aspectRatio = eval(ratioStr);
      } catch (e) {
        // Ignore
      }
    }

    return { id: blobId, caption, span, aspectRatio };
  }

  function extractTextFromNodes(nodes: any[]): string {
    return nodes.map((node) => {
      if (node.type === "text") {
        return node.value;
      }
      if (node.type === "paragraph") {
        const text = extractText(node);
        return text;
      }
      if (node.type === "heading") {
        const text = extractText(node);
        return `${"#".repeat(node.depth)} ${text}`;
      }
      if (Array.isArray(node.children)) {
        return extractTextFromNodes(node.children);
      }
      return "";
    }).filter(x => x).join("\n\n");
  }

  function go(node: any, insideGroup = false): any {
    // Check if this is a Text block
    if ((node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") && node.name === "Text") {
      // Extract the text content from children
      const textContent = extractTextFromNodes(node.children || []);

      contentBlocks.push({
        __typename: "TextBlock",
        id: `text-${textBlockId++}`,
        content: textContent,
      });
      return;
    }

    // Check if this is a Group
    if ((node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") && node.name === "Group") {
      // Extract all images from the group
      const images: Array<any> = [];
      if (Array.isArray(node.children)) {
        node.children.forEach((child: any) => {
          if ((child.type === "mdxJsxFlowElement" || child.type === "mdxJsxTextElement") && child.name === "Image") {
            const imageData = extractImageData(child);
            if (imageData.id) {
              images.push(imageData);
            }
          }
        });
      }

      if (images.length > 0) {
        contentBlocks.push({
          __typename: "ImageGroup",
          id: `group-${groupId++}`,
          images,
        });
      }
      return;
    }

    // Check if this is an Image or Clip block (not inside a group)
    if (!insideGroup && (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
        (node.name === "Image" || node.name === "Clip")) {

      const blobId = node.attributes?.find((x: any) => x.type === "mdxJsxAttribute" && x.name === "blobId")?.value;
      const caption = node.attributes?.find((x: any) => x.type === "mdxJsxAttribute" && x.name === "caption")?.value;

      if (blobId) {
        contentBlocks.push({
          __typename: node.name === "Image" ? "Image" : "Clip",
          id: blobId,
          caption,
        } as Image | Clip);
      }
      return;
    }

    // Recursively process children
    if (Array.isArray(node.children)) {
      node.children.forEach((child) => go(child, insideGroup));
    }
  }

  const tree = unified().use(remarkParse).use(remarkMdx).parse(mdx);
  go(tree);

  return contentBlocks;
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

  const { data } = await execute(BlobQuery, { name });
  if (!data || !data.blob) {
    throw new Error(`Blob ${name} not found`);
  }

  return data.blob;
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
