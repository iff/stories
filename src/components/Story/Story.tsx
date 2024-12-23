"use client";

import { Content } from "@/components/Content";
import * as React from "react";
import { Context } from "./context";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  blobs: Array<any>;
}

function Story(props: Props) {
  const { blobs, children, ...rest } = props;

  return (
    <Context.Provider value={{ blobs }}>
      <Root {...rest}>
        <Content>{children}</Content>

        <div style={{ marginBottom: "10vh" }} />
      </Root>
    </Context.Provider>
  );
}

export default Story;
