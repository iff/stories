import * as React from "react";
import NextImage from "next/legacy/image";

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "grid" }}>
      <NextImage
        alt=""
        src={`${process.env.API}/serve/3hTEGq6HsHYSQzVd1qP8Z7UwK7J2Ggm5U5YC6PdQjHVU`}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
