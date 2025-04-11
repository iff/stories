import { importBlob } from "@/cms";
import NextImage from "next/image";
import * as React from "react";
import { Lightbox } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Lightbox>>;

export default async function Sample(props: Props) {
  return (
    <div style={{ height: "600px" }}>
      <Lightbox {...props}>
        <NextImage
          alt=""
          src={(await importBlob("3c2f6pB3cuLRJp4wgf77c2vg4YX55GrnhvzL9eMc8yHC")).asImage.url}
          fill
          sizes="100vw"
          style={{
            objectFit: "contain",
          }}
        />
      </Lightbox>
    </div>
  );
}
