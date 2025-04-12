import { lookupStory } from "content";
import Image from "next/image";
import { notFound } from "next/navigation";
import * as React from "react";

interface Props {
  params: Promise<{ storyId: string }>;
}

export default async function Page(props: Props) {
  const { storyId } = await props.params;

  const story = await lookupStory(storyId);
  if (!story) {
    return notFound();
  }

  return (
    <div style={{ width: "100vw", height: "100vh", display: "grid" }}>
      <Image
        alt=""
        src={`${process.env.API}/serve/${story.image}`}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
}
