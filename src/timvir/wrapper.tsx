"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Page } from "timvir/core";
import { mdxComponents } from "./components";
import toc from "./toc";

export default function Wrapper({ children }: { children?: React.ReactNode }) {
  const asPath = usePathname();
  if (!asPath) {
    return null;
  }

  return (
    <>
      <script type="module" src="/docs.js" />
      <link href="https://unpkg.com/timvir@0.2.36/styles.css" rel="stylesheet" />

      <Page
        location={{ asPath, push() {} }}
        Link={Link as React.ComponentType<React.ComponentProps<"a">>}
        toc={toc}
        mdxComponents={mdxComponents}
      >
        {children}
      </Page>
    </>
  );
}
