import { StoryCard } from "@/components/StoryCard";
import * as React from "react";
import { importBlob } from "../../image.macro";

export default function Component() {
  return (
    <StoryCard
      layout="inverted"
      story={{
        id: "shivering-sense",
      }}
      blocks={[importBlob("4U6KQvhw1RBh3LRsfUm3YKYzcinDGEfmWWsu5mK8LwKS")]}
      blob={importBlob("BefU8tziWMjkR6YWg5Tt5187xsdkkXp2ro5zSA6FYTWW")}
      title="Shivering Sense"
      teaser="Escaping the freezing european winter weather and spending Christmas and New Years somplace warm."
      date={[new Date(Date.parse("2021-12-19")), new Date(Date.parse("2022-02-16"))]}
    />
  );
}
