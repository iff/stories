import { importBlob } from "@/cms";
import { StoryCard } from "@/components/StoryCard";
import * as React from "react";

export default async function Component() {
  return (
    <StoryCard
      story={{
        id: "dreamers-wake",
      }}
      blocks={[await importBlob("2jQPQHZQUdWZM1KiHDiYWzZs3LF6aTWBK8diCZPo3kcd")]}
      blob={await importBlob("5zuDhsdMcMz7Cvk97Vr2ErDiQb8SYknUPiemgeJmgsCa")}
      title="Dreamer's Wake"
      teaser="Madeira wasn't my first choice where to go, but I'm glad the weather circumstances made me change my plans and go to this gorgeous island. I'll forever be grateful for the experience that I've had the chance to live through, and the people I've met."
      date={[new Date(Date.parse("2021-06-26")), new Date(Date.parse("2021-07-13"))]}
    />
  );
}
