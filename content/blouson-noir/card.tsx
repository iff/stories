import { StoryCard } from "@/components/StoryCard";
import * as React from "react";
import { importBlob } from "../../image.macro";

export default function Component() {
  return (
    <StoryCard
      layout="inverted"
      story={{
        id: "blouson-noir",
      }}
      blocks={[importBlob("94CwSoC6ZdyDJof7juAxMo9gpyUkhKDhZgSTDeeYrz2Z")]}
      blob={importBlob("EZo7bbvxF2sCpKdeB4LjSnhSrrkvH4dPXB4LSwz4SdCZ")}
      title="Blouson Noir"
      teaser="A remote-work experiment from a small country in western asia. I spent four weeks in Armenia, traveled 2200km by car, living in a tent while working my 9to5 day job."
      date={[new Date(Date.parse("2021-09-13")), new Date(Date.parse("2021-10-16"))]}
    />
  );
}
