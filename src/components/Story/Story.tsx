"use client";

import { Content } from "@/components/Content";
import { MDXProvider } from "@mdx-js/react";
import * as React from "react";
import { Context } from "./context";
import { components } from "./internal";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  storyId: string;
  Body: any;
  blobs: Array<any>;
}

function Story(props: Props) {
  const { storyId, Body, blobs, ...rest } = props;

  return (
    <Context.Provider value={{ storyId, blobs }}>
      <MDXProvider components={components}>
        <Content>
          <Body />
        </Content>

        <div style={{ marginBottom: "10vh" }} />
      </MDXProvider>
    </Context.Provider>
  );
}

export default Story;
