import * as React from "react";
import { Clip } from "..";
import { importBlob } from "@/cms";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Clip>>;

export default async function Sample(props: Props) {
  return (
    <Clip
      video={(await importBlob("5bgepApG4LoLLgTrMZfBdZ4ZMe5ddEsFvAQaCJCPLrNx")).asVideo}
      caption="Tortor posuere ac ut consequat semper viverra nam."
      onFocus={() => {}}
      {...props}
    />
  );
}
