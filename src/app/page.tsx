import * as stylex from "@stylexjs/stylex";

import { importImage } from "@/cms";
import { StoryCard } from "@/components/StoryCard";

import { stories } from "../../content";

export default async function Page() {
  return (
    <>
      <div {...stylex.props(styles.storyCards)}>
        {await Promise.all(
          featuredStories.map(async (story, _index) => (
            <StoryCard
              key={story.id}
              story={{
                id: story.id,
              }}
              blob={await importImage(story.image)}
              title={story.title}
            />
          )),
        )}
      </div>
    </>
  );
}

const styles = stylex.create({
  storyCards: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "3rem",
    padding: "2rem",
    maxWidth: "1400px",
    margin: "0 auto",

    "@media (min-width: 1024px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "4rem",
    },

    "@media (max-width: 640px)": {
      gridTemplateColumns: "1fr",
      gap: "2rem",
    },
  },
});

const featuredStories = [...stories]
  .sort((a, b) => b.date[0].getTime() - a.date[0].getTime())
  .filter((x) => x.visibility === "PUBLIC");
