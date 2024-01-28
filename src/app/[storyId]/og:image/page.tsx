import { stories } from "content";
import { notFound } from "next/navigation";
import * as React from "react";
import Image from "next/image";

interface Props {
  params: { storyId: string };
}

export default async function Page(props: Props) {
  const { storyId } = props.params;
  const story = stories.find((x) => x.id === storyId);
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
