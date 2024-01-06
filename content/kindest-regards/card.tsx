import { importBlob } from "@/cms";
import { StoryCard } from "@/components/StoryCard";
import * as React from "react";

export default async function Component() {
  return (
    <StoryCard
      layout="inverted"
      story={{
        id: "kindest-regards",
      }}
      blocks={[await importBlob("8T5Xc8AYcWk7VcCPSZmScwZiXBjgrWZdTBMqd7w8x7dv")]}
      blob={await importBlob("ARSdapw2zdSqg2mBAePGixd7z7oPzythmAafqogNCVjd")}
      title="Don't Look Down"
      teaser="…"
      date={[new Date(Date.parse("2023-08-18")), new Date(Date.parse("2023-09-17"))]}
    />
  );
}
