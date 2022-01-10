import NextImage from "next/image";
import * as React from "react";
import { importBlob } from "../../image.macro";

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "grid" }}>
      <NextImage src={importBlob("2ZfTSs9o51poWKLtqQ2X9Fo7jgKE7dK8g4CXKybZxQB2").src} layout="fill" objectFit="cover" />
    </div>
  );
}
