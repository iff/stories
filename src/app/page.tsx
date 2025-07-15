import * as stylex from "@stylexjs/stylex";

import { importBlob } from "@/cms";
import { Hero } from "@/components/Hero";
import { StoryCard } from "@/components/StoryCard";

import { stories } from "../../content";

export default async function Page() {
  return (
    <>
      <Hero />

      <div {...stylex.props(styles.storyCards)}>
        {
          await Promise.all(
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
            )),
          )
        }
      </div>
    </>
  );
}

const styles = stylex.create({
  storyCards: {
    display: "grid",
    gap: "6em",
    marginBlock: "2em 6em",

    "@media (min-width: 720px)": {
      gap: "9em",
    },
  },
});

const featuredStories = [...stories]
  .sort((a, b) => b.date[0].getTime() - a.date[0].getTime())
  .filter((x) => x.visibility === "PUBLIC");
