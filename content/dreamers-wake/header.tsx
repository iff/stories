import { importBlob } from "@/cms";
import { Header } from "@/components/Header";
import { css } from "@linaria/core";
import * as React from "react";

export default async function header() {
  return (
    <div>
      <Header blob={await importBlob("EQ9L1yjAsYBaJqmmmU5iNsrx4ws2ysECSxpoFQXa51oo")} title="Dreamer's Wake" />
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
