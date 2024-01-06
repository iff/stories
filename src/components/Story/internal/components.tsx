import { css } from "@linaria/core";
import * as React from "react";
import { default as Clip } from "./components/Clip";
import { default as Group } from "./components/Group";
import { default as Heading } from "./components/Heading";
import { default as Image } from "./components/Image";

export const components = {
  h1: (props) => <Heading {...props} />,
  Image,
  Group,
  Clip,
  blockquote: (props: any) => (
    <blockquote
      className={css`
        margin: 1em 0;
        padding-left: 1em;
        border-left: 2px solid #fe762a;

        & > p {
          margin: 0;
        }
      `}
      {...props}
    />
  ),
};
