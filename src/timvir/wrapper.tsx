import { Page } from "timvir/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import toc from "./toc";
import { Code } from "timvir/blocks";

const mdxComponents = {
  pre: function pre(props: any) {
    const [, language = "markdown"] = (props.children?.props?.className || "").match(/^language-(.*)$/) || [];
    return <Code language={language}>{props.children.props.children}</Code>;
  },
};

export default function Wrapper({ children }: { children?: React.ReactNode }) {
  const asPath = usePathname()!;

  return (
    <>
      <script type="module" src="/docs.js" />
      <link href="https://unpkg.com/timvir@0.2.20/styles.css" rel="stylesheet" />

      <Page location={{ asPath, push() {} }} Link={Link as any} toc={toc} mdxComponents={mdxComponents}>
        {children}
      </Page>
    </>
  );
}
