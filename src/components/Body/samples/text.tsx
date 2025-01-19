import * as React from "react";
import { Body } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Body>>;

import Component from "./text.mdx";

export default async function Sample(props: Props) {
  return <Body storyId={"storyId"} blobs={[]} Component={Component} {...props} />;
}
