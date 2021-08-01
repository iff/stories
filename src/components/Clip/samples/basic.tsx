import * as React from "react";
import { Clip } from "..";
import { importImage } from "../../../../image.macro";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Clip>>;

export default function Sample(props: Props) {
  return <Clip poster={importImage("https://storage.googleapis.com/stories.caurea.org/video-2.jpg")} {...props} />;
}
