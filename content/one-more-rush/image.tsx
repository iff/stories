import * as React from "react";
import NextImage from "next/legacy/image";

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "grid" }}>
      <NextImage
        alt=""
        src={`${process.env.API}/serve/4zfWtmEUAz4bPvkAHZUVrdik83FJtWZkZ2eJ1cYkZ7Kc`}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
