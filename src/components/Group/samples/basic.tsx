import { Image } from "@/components/Image";
import * as React from "react";
import { Group } from "..";
import { importImage } from "../../../../image.macro";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Group>>;

export default function Sample(props: Props) {
  return (
    <Group {...props}>
      <Image
        span={[4]}
        aspectRatio={16 / 9}
        image={importImage("https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/DJI_0059.jpg")}
        href="#"
      />
      <Image
        span={[5]}
        aspectRatio={16 / 9}
        image={importImage("https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/DJI_0071.jpg")}
        href="#"
      />
      <Image
        span={[3]}
        aspectRatio={2 / 3}
        image={importImage("https://storage.googleapis.com/caurea.org/stories/kyrgyzstan/DJI_0020.jpg")}
        href="#"
      />
    </Group>
  );
}
