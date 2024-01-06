import { importBlob } from "@/cms";
import { StoryCard } from "@/components/StoryCard";
import * as React from "react";

export default async function Component() {
  return (
    <StoryCard
      story={{
        id: "kindest-regards",
      }}
      blocks={[await importBlob("EpLn9QA3f1b53Jgr6uut7zDCHXMArXsrzEX9rVVJqv63")]}
      blob={await importBlob("22hCRWsjuwBeb6agngFxpD2R5p1f14e4ap6yAT48idmX")}
      title="Kindest Regards"
      teaser="Fying over 9000 kilometers just to attend a 3 day workshop is wasteful. Why not stay a bit longer?"
      date={[new Date(Date.parse("2023-08-18")), new Date(Date.parse("2023-09-17"))]}
    />
  );
}
