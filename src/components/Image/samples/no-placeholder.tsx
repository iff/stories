import * as React from "react";
import { Image } from "..";
import { importBlob } from "@/cms";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Image>>;

export default async function Sample(props: Props) {
  return (
    <Image
      blob={await (async () => {
        const blob = await importBlob("3c2f6pB3cuLRJp4wgf77c2vg4YX55GrnhvzL9eMc8yHC");
        blob.asImage.url = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        blob.asImage.placeholder = null;
        return blob;
      })()}
      {...props}
    />
  );
}
