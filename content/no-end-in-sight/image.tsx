import * as React from "react";
import NextImage from "next/legacy/image";

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "grid" }}>
      <NextImage
        alt=""
        src={`${process.env.API}/serve/ARSdapw2zdSqg2mBAePGixd7z7oPzythmAafqogNCVjd`}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
