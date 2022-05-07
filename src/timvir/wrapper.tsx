import { Page } from "timvir/core";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import Head from "next/head";
import toc from "./toc";
import { Components } from "@mdx-js/react/lib/index";
import { Code } from "timvir/blocks";

const mdxComponents: Components = {
  pre: function pre(props: any) {
    const [, language = "markdown"] = (props.className || "").match(/^language-(.*)$/) || [];
    return <Code language={language}>{props.children.props.children}</Code>;
  },
};

export default function Wrapper({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Head>
        <link href="https://unpkg.com/timvir@0.1.44/styles.css" rel="stylesheet" />
      </Head>

      <Page location={useRouter()} Link={Link as any} toc={toc} mdxComponents={mdxComponents}>
        {children}
      </Page>
    </>
  );
}
