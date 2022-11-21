import NextImage from "next/image";
import * as React from "react";
import { Lightbox } from "..";
import { importBlob } from "../../../../image.macro";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Lightbox>>;

export default function Sample(props: Props) {
  return (
    <div style={{ height: "600px" }}>
      <Lightbox {...props}>
        <NextImage
          alt=""
          src={importBlob("3c2f6pB3cuLRJp4wgf77c2vg4YX55GrnhvzL9eMc8yHC").src}
          objectFit="contain"
          layout="fill"
        />
      </Lightbox>
    </div>
  );
}
