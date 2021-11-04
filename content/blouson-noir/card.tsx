import { StoryCard } from "@/components/StoryCard";
import * as React from "react";
import { importImage } from "../../image.macro";

export default function Component() {
  return (
    <StoryCard
      story={{
        id: "blouson-noir",
      }}
      blocks={[importImage("https://web-4n62l3bdha-lz.a.run.app/serve/FgWgpYb2tgwhvDdVoo2aVQj7hvktNT9tJ7gZAeYHWGyU")]}
      image={importImage("https://web-4n62l3bdha-lz.a.run.app/serve/CbAA5a6fa9Qdb7E6gCnfNVx5UXbAxwLXGxAP5PDDMqYV")}
      title="Blouson Noir"
      teaser="…"
      date={[new Date(Date.parse("2021-09-13")), new Date(Date.parse("2021-10-16"))]}
    />
  );
}
