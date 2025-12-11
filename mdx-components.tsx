import type { MDXComponents } from "mdx/types";
import { MdxImage, MdxText } from "./src/components/mdx";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Text: MdxText,
    Image: MdxImage,
  };
}
