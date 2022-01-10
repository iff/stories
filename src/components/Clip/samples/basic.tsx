import * as React from "react";
import { Clip } from "..";
import { importImage } from "../../../../image.macro";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Clip>>;

export default function Sample(props: Props) {
  return (
    <Clip
      clip={{
        id: "x",
        blob: {
          url: "https://storage.googleapis.com/stories.caurea.org/docs/video@720p.mp4",
        },
        poster: importImage("https://storage.googleapis.com/stories.caurea.org/video-2.jpg"),
      }}
      caption="Pod of dolphins midway between Madeira and Desertas Islands."
      onFocus={() => {}}
      {...props}
    />
  );
}
