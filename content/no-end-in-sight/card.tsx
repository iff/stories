import { importBlob } from "@/cms";
import { StoryCard } from "@/components/StoryCard";
import * as React from "react";

export default async function Component() {
  return (
    <StoryCard
      layout="inverted"
      story={{
        id: "no-end-in-sight",
      }}
      blocks={[await importBlob("8T5Xc8AYcWk7VcCPSZmScwZiXBjgrWZdTBMqd7w8x7dv")]}
      blob={await importBlob("ARSdapw2zdSqg2mBAePGixd7z7oPzythmAafqogNCVjd")}
      title="No End in Sight"
      teaser="Exploring North Macedonia's cities, mountains, and lakes during the last warm autumn days of 2022."
      date={[new Date(Date.parse("2022-10-26")), new Date(Date.parse("2022-11-13"))]}
    />
  );
}
