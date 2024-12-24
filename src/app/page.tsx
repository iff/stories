import { Hero } from "@/components/Hero";
import * as React from "react";
import { stories } from "../../content";
import { StoryCard } from "@/components/StoryCard";
import { importBlob } from "@/cms";

export default async function Page() {
  return (
    <>
      <Hero />

      <div style={{ display: "grid", gap: "6em", marginBlock: "2em 6em" }}>
        {await Promise.all(
          featuredStories.map(async (story, index) => (
            <StoryCard
              key={story.id}
              layout={index % 2 ? "inverted" : "regular"}
              story={{
                id: story.id,
              }}
              blob={await importBlob(story.image)}
              blocks={await Promise.all(story.teaser.images.map((name) => importBlob(name)))}
              title={story.title}
              teaser={story.teaser.text}
              date={story.date}
            />
          ))
        )}
      </div>
    </>
  );
}

const featuredStories = [...stories]
  .sort((a, b) => b.date[0].getTime() - a.date[0].getTime())
  .filter((x) => x.visibility === "PUBLIC");
