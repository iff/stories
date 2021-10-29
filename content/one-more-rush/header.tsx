import { Header } from "@/components/Header";
import { css } from "@linaria/core";
import * as React from "react";
import { importBlob } from "../../image.macro";

export default function header() {
  return (
    <div>
      <Header image={importBlob("4zfWtmEUAz4bPvkAHZUVrdik83FJtWZkZ2eJ1cYkZ7Kc")} title="One More Rush" />
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
