import NextImage from "next/image";
import * as React from "react";

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "grid" }}>
      <NextImage
        alt=""
        src={`${process.env.API}/serve/2ZfTSs9o51poWKLtqQ2X9Fo7jgKE7dK8g4CXKybZxQB2`}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
}
