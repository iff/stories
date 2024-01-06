import * as React from "react";
import NextImage from "next/image";

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "grid" }}>
      <NextImage
        alt=""
        src={`${process.env.API}/serve/B9uJRSuzBxXBpBhAKZAYm1S35wD6s2sH2RixcN9G8Wax`}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
}
