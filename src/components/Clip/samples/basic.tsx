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
        renditions: [
          {
            label: "2160p",
            height: 2160,
            url: "https://storage.googleapis.com/stories.caurea.org/docs/video@2160p.mp4",
          },
          {
            label: "1080p",
            height: 1080,
            url: "https://storage.googleapis.com/stories.caurea.org/docs/video@1080p.mp4",
          },
          {
            label: "720p",
            height: 720,
            url: "https://storage.googleapis.com/stories.caurea.org/docs/video@720p.mp4",
          },
        ],
      }}
      caption="Pod of dolphins midway between Madeira and Desertas Islands."
      {...props}
    />
  );
}
