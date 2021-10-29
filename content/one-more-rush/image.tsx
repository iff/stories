import * as React from "react";
import NextImage from "next/image";

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "grid" }}>
      <NextImage
        src="https://web-4n62l3bdha-lz.a.run.app/serve/4zfWtmEUAz4bPvkAHZUVrdik83FJtWZkZ2eJ1cYkZ7Kc"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
