import { Hero } from "@/components/Hero";
import Head from "next/head";
import * as React from "react";
import stories from "../../content";

export default async function Page() {
  return (
    <>
      <Head>
        <title>Stories by Tomáš Čarnecky</title>
      </Head>

      <Hero />

      <div>
        {featuredStories.map((storyId) => (
          <div key={storyId} style={{ margin: "2em 0 6em" }}>
            {React.createElement(stories[storyId].Card)}
          </div>
        ))}
      </div>
    </>
  );
}

const featuredStories = [
  "where-the-roads-collide",
  "rebirth",
  "no-end-in-sight",
  "shivering-sense",
  "blouson-noir",
  "dreamers-wake",
  "one-more-rush",
  "where-i-was-meant-to-be",
];
