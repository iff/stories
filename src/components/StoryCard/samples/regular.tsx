import { importBlob } from "@/cms";
import * as React from "react";
import { StoryCard } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof StoryCard>>;

export default async function Sample(props: Props) {
  return (
    <StoryCard
      story={{ id: "ID" }}
      blob={await importBlob("4zfWtmEUAz4bPvkAHZUVrdik83FJtWZkZ2eJ1cYkZ7Kc")}
      title="Semper viverra nam libero justo laoreet"
      date={[new Date(Date.parse("2021-01-05")), new Date(Date.parse("2021-01-19"))]}
      teaser="Suspendisse ultrices gravida dictum fusce ut. Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt. Amet cursus sit amet dictum sit amet justo donec enim. Ut tortor pretium viverra suspendisse potenti."
      {...props}
    />
  );
}
