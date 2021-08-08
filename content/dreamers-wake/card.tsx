import { StoryCard } from "@/components/StoryCard";
import * as React from "react";
import { importImage } from "../../image.macro";

export default function Component() {
  return (
    <StoryCard
      story={{
        id: "dreamers-wake",
      }}
      blocks={[importImage("https://storage.googleapis.com/stories.caurea.org/dreamers-wake/IMG_6001.jpeg")]}
      image={importImage("https://storage.googleapis.com/stories.caurea.org/dreamers-wake/IMG_6483.jpeg")}
      title="Dreamer's Wake"
      teaser="Madeira wasn't my first choice where to go, but I'm glad the weather circumstances made me change my plans and go to this gorgeous island. I'll forever be grateful for the experience that I've had the chance to live through, and the people I've met."
      date={[new Date(Date.parse("2021-06-26")), new Date(Date.parse("2021-07-13"))]}
    />
  );
}
