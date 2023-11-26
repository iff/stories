import { importBlob } from "@/cms";
import { StoryCard } from "@/components/StoryCard";
import * as React from "react";

export default async function Component() {
  return (
    <StoryCard
      story={{
        id: "shivering-sense",
      }}
      blocks={[await importBlob("4U6KQvhw1RBh3LRsfUm3YKYzcinDGEfmWWsu5mK8LwKS")]}
      blob={await importBlob("BefU8tziWMjkR6YWg5Tt5187xsdkkXp2ro5zSA6FYTWW")}
      title="Shivering Sense"
      teaser="Escaping the freezing european winter weather and spending Christmas and New Years somplace warm."
      date={[new Date(Date.parse("2021-12-19")), new Date(Date.parse("2022-02-16"))]}
    />
  );
}
