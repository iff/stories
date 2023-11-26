import { importBlob } from "@/cms";
import { Header } from "@/components/Header";
import { css } from "@linaria/core";
import * as React from "react";

export default async function header() {
  return (
    <div>
      <Header blob={await importBlob("4zfWtmEUAz4bPvkAHZUVrdik83FJtWZkZ2eJ1cYkZ7Kc")} title="One More Rush" />
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
