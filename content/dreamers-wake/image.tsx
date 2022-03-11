import * as React from "react";
import NextImage from "next/image";

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "grid" }}>
      <NextImage
        src={`${process.env.API}/serve/9WcbszSHN5XjM9VW8BNK7V6iTGb253g6rJroBPxHj1hL`}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
