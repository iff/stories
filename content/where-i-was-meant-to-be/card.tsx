import { StoryCard } from "@/components/StoryCard";
import * as React from "react";
import { importBlob } from "../../image.macro";

export default function Component() {
  return (
    <StoryCard
      story={{
        id: "where-i-was-meant-to-be",
      }}
      blob={importBlob("2ZfTSs9o51poWKLtqQ2X9Fo7jgKE7dK8g4CXKybZxQB2")}
      blocks={[importBlob("4urziJ8cBEYCJxWdGWZriVDwi966AxQZRxYsVCT4hjjv")]}
      title="Where I was meant to be"
      teaser="I was going through a really fucking difficult time in my life and needed to get the fuck away from comfort."
      date={[new Date(Date.parse("2021-01-05")), new Date(Date.parse("2021-01-19"))]}
    />
  );
}
