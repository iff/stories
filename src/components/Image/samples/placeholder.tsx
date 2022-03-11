import * as React from "react";
import { Image } from "..";
import { importBlob } from "../../../../image.macro";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Image>>;

export default function Sample(props: Props) {
  return (
    <Image
      blob={(() => {
        const blob = importBlob("3c2f6pB3cuLRJp4wgf77c2vg4YX55GrnhvzL9eMc8yHC");
        blob.asImage.url = "/404";
        return blob;
      })()}
      {...props}
    />
  );
}
