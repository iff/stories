import * as React from "react";
import NextImage from "next/image";

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "grid" }}>
      <NextImage
        src={`${process.env.API}/serve/BefU8tziWMjkR6YWg5Tt5187xsdkkXp2ro5zSA6FYTWW`}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
