"use client";

import * as React from "react";
import stories from "../../../content";
import Story from "./Story";

/**
 * The underlying DOM element which is rendered by this component.
 */
const Root = "div";

interface Props extends React.ComponentPropsWithoutRef<typeof Root> {
  storyId: string;
  blobs: Array<any>;
}

function StoryById(props: Props) {
  return <Story {...props} {...stories[props.storyId]} />;
}

export default StoryById;
