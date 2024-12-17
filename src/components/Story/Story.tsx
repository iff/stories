"use client";

import { Content } from "@/components/Content";
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
      <Root {...rest}>
        <Content>
          <Body components={components} />
        </Content>

        <div style={{ marginBottom: "10vh" }} />
      </Root>
    </Context.Provider>
  );
}

export default Story;
