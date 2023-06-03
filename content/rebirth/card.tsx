import { StoryCard } from "@/components/StoryCard";
import * as React from "react";
import { importBlob } from "../../image.macro";

export default function Component() {
  return (
    <StoryCard
      story={{
        id: "rebirth",
      }}
      blocks={[importBlob("ComZXKPfxqaKvk4nPd772JPNyjGj2QR7JrbdPFg16Pdt")]}
      blob={importBlob("3hTEGq6HsHYSQzVd1qP8Z7UwK7J2Ggm5U5YC6PdQjHVU")}
      title="Rebirth"
      teaser="A second opportunity presented itself for me to spend a few weeks in Morocco. I celebrated christmas in a dasert camp, and summitted the highest mountain of north africa on new years eve."
      date={[new Date(Date.parse("2022-12-14")), new Date(Date.parse("2023-01-15"))]}
    />
  );
}
