import dynamic from "next/dynamic";
import * as React from "react";

export const site = {
  title: "Lenses",
  byline:
    "sometimes the lense with which I perceive the world is a physical device attached to a camera",

  author: {
    name: "Yves Ineichen",
    email: "y@iff.io",
  },
};

export async function lookupStory(id: string): Promise<Story | undefined> {
  return stories.find((story) => story.id === id);
}

interface Story {
  id: string;

  visibility: "PUBLIC" | "HIDDEN";

  /**
   * Date when the story was published. Stories that are hidden may have no publishedAt
   * date yet.
   */
  publishedAt: null | Date;

  title: string;

  /**
   * The date range (first / last day) when the story took place.
   */
  date: [Date, Date];

  body: {
    Component: React.ComponentType;
  };
}

export const stories: Story[] = [
  {
    id: "hawaii",

    visibility: "PUBLIC",
    publishedAt: new Date(Date.parse("2020-01-01")),

    title: "Hawaii",
    date: [
      new Date(Date.parse("2016-11-15")),
      new Date(Date.parse("2016-12-01")),
    ],

    body: {
      /**
       * A React component that renders the story body.
       */
      Component: dynamic(() => import(`./hawaii/body.mdx`)),
    },
  },
  {
    id: "amsterdam",

    visibility: "PUBLIC",
    publishedAt: new Date(Date.parse("2020-01-01")),

    title: "Amsterdam",
    date: [
      new Date(Date.parse("2017-05-20")),
      new Date(Date.parse("2017-06-01")),
    ],

    body: {
      /**
       * A React component that renders the story body.
       */
      Component: dynamic(() => import(`./amsterdam/body.mdx`)),
    },
  },
  {
    id: "marocco",

    visibility: "PUBLIC",
    publishedAt: new Date(Date.parse("2020-01-01")),

    title: "Marocco",
    date: [
      new Date(Date.parse("2019-01-31")),
      new Date(Date.parse("2019-02-10")),
    ],

    body: {
      /**
       * A React component that renders the story body.
       */
      Component: dynamic(() => import(`./marocco/body.mdx`)),
    },
  },
  {
    id: "snowline",

    visibility: "PUBLIC",
    publishedAt: new Date(Date.parse("2020-01-01")),

    title: "Snowline",
    date: [
      new Date(Date.parse("2021-03-06")),
      new Date(Date.parse("2021-03-06")),
    ],

    body: {
      /**
       * A React component that renders the story body.
       */
      Component: dynamic(() => import(`./snowline/body.mdx`)),
    },
  },
  {
    id: "bavona",

    visibility: "PUBLIC",
    publishedAt: new Date(Date.parse("2020-01-01")),

    title: "Bavona",
    date: [
      new Date(Date.parse("2020-01-01")),
      new Date(Date.parse("2024-02-10")),
    ],

    body: {
      /**
       * A React component that renders the story body.
       */
      Component: dynamic(() => import(`./bavona/body.mdx`)),
    },
  },
  {
    id: "bergell",

    visibility: "HIDDEN",
    publishedAt: new Date(Date.parse("2020-01-01")),

    title: "Bergell",
    date: [
      new Date(Date.parse("2020-01-01")),
      new Date(Date.parse("2024-02-10")),
    ],

    body: {
      /**
       * A React component that renders the story body.
       */
      Component: dynamic(() => import(`./bergell/body.mdx`)),
    },
  },
  {
    id: "nz",

    visibility: "HIDDEN",
    publishedAt: new Date(Date.parse("2020-01-01")),

    title: "New Zealand",
    date: [
      new Date(Date.parse("2020-01-01")),
      new Date(Date.parse("2024-02-10")),
    ],

    body: {
      /**
       * A React component that renders the story body.
       */
      Component: dynamic(() => import(`./nz/body.mdx`)),
    },
  },
];
