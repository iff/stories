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
    <Context.Provider value={{ blobs }}>
      <Root {...rest}>
        <Content>
          <Body
            components={{
              ...components,

              Clip: (props: any) => <components.Clip storyId={storyId} {...props} />,
              Image: (props: any) => <components.Image storyId={storyId} {...props} />,
            }}
          />
        </Content>

        <div style={{ marginBottom: "10vh" }} />
      </Root>
    </Context.Provider>
  );
}

export default Story;
