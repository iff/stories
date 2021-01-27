import * as React from "react";
import { Image } from "..";
import { importImage } from "@zhif/macro"

type Props = Partial<React.ComponentPropsWithoutRef<typeof Image>>;

export default function Sample(props: Props) {
  return (
    <Image
      source={importImage("https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/DJI_0059.jpg")}
      layout="responsive"
      caption="Ligula ullamcorper malesuada proin libero."
      {...props}
    />
  );
}