import * as React from "react";
import NextImage from "next/image";

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "grid" }}>
      <NextImage
        alt=""
        src={`${process.env.API}/serve/CbAA5a6fa9Qdb7E6gCnfNVx5UXbAxwLXGxAP5PDDMqYV`}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
