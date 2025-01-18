import * as stylex from "@stylexjs/stylex";
import * as React from "react";

import { default as Clip } from "./components/Clip";
import { default as Group } from "./components/Group";
import { default as Heading } from "./components/Heading";
import { default as Image } from "./components/Image";

export const components = {
  h1: (props: any) => <Heading {...props} />,
  h2: (props: any) => <h2 {...props} {...stylex.props(styles.h2)} />,
  p: (props: any) => <p {...props} {...stylex.props(styles.p)} />,
  blockquote: (props: any) => <blockquote {...stylex.props(styles.blockquote)} {...props} />,

  Image,
  Group,
  Clip,
};

const styles = stylex.create({
  h2: {
    margin: "3em 0 1em",
    gridColumn: "lc / rc",
  },
  p: {
    margin: 0,
    gridColumn: "lc / rc",
  },
  blockquote: {
    margin: "1em 0",
    paddingLeft: "1em",
    borderLeft: "2px solid #fe762a",
    gridColumn: "lc / rc",
  },
});
