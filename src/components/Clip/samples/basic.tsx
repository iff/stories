import * as React from "react";
import { Clip } from "..";
import { importBlob } from "../../../../image.macro";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Clip>>;

export default function Sample(props: Props) {
  return (
    <Clip
      video={importBlob("5bgepApG4LoLLgTrMZfBdZ4ZMe5ddEsFvAQaCJCPLrNx").asVideo}
      caption="Tortor posuere ac ut consequat semper viverra nam."
      onFocus={() => {}}
      {...props}
    />
  );
}
