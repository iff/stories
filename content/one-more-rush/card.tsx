import { importBlob } from "@/cms";
import { StoryCard } from "@/components/StoryCard";
import * as React from "react";

export default async function Component() {
  return (
    <StoryCard
      layout="inverted"
      story={{
        id: "one-more-rush",
      }}
      blocks={[await importBlob("G2RyoGrTfkSnw37DBsyVP4JGgcEMB33NR4AfJ5HBssG9")]}
      blob={await importBlob("4zfWtmEUAz4bPvkAHZUVrdik83FJtWZkZ2eJ1cYkZ7Kc")}
      title="One More Rush"
      teaser="I’m fortunate enough that I can work from wherever there is good internet. That
      covers a lot of this earths surface – and airspace."
      date={[new Date(Date.parse("2021-03-28")), new Date(Date.parse("2021-05-07"))]}
    />
  );
}
