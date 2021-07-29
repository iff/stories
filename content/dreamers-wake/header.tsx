import { Header } from "@/components/Header";
import { css } from "@linaria/core";
import * as React from "react";
import { importImage } from "../../image.macro";

export default function header() {
  return (
    <div>
      <Header
        image={importImage("https://storage.googleapis.com/stories.caurea.org/dreamers-wake/IMG_6497.jpeg")}
        title="Dreamer's Wake"
      />
    </div>
  );
}

const classes = {
  brandmark: css`
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 2;
  `,
};
