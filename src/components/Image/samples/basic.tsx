import * as React from "react";
import { importImage } from "@/cms";
import { Image } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Image>>;

export default async function Sample(props: Props) {
  return (
    <Image
      blob={await importImage("3c2f6pB3cuLRJp4wgf77c2vg4YX55GrnhvzL9eMc8yHC")}
      caption="Ligula ullamcorper malesuada proin libero."
      {...props}
    />
  );
}
