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

  /**
   * The primary image for the story. This is used in the teaser on the home page,
   * in the header on the story page, and as the Open Graph image.
   */
  image: string;

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
    image: "GzkGi2tBqxRFQ3efnr5Kxa64tX56hb4fbnK5tTWM5a9k",
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
    image: "47xXYVZEjAVVyEqYs7TpphRpE52WKZ7nVXoqJPT67iX3",
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
    image: "6hkdp7oJ9g8qqzGcP9AAXrv9xk6S9GTUPB42J1YAYXeX",
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
    image: "C673XbvFp8M5k899he4QNmj919yu5uMsBbckNfNyUVqT",
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
    image: "HMzyN2b5oADqoKsK29WZjxebYWWUWhZ7PZQ3HQyzn8WV",
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
    image: "BCctiLtVp3AheJNa1RqSZ32eMAtjRvJ6ppYMESJ845x8",
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
    image: "8Cfadtq1pQ2XgLn55skdb2CoawepiJF1kF9HwUZW8T3r",
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
