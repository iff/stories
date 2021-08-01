import * as React from "react";
import NextImage from "next/image";

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "grid" }}>
      <NextImage
        src="https://storage.googleapis.com/stories.caurea.org/dreamers-wake/IMG_6497.jpeg"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
