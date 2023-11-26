import NextImage from "next/image";
import * as React from "react";

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "grid" }}>
      <NextImage
        alt=""
        src={`${process.env.API}/serve/FvWPgxfsmWHtaUmzuNSte99GMM5Rtiu2CiKMJnZgXbfR`}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
}
