import dynamic from "next/dynamic";
import * as React from "react";

export const site = {
  title: "Lenses",
  byline: "sometimes the lense with which I perceive the world is a physical device attached to a camera",

  author: {
    name: "Yves Ineichen",
    email: "",
  },
};

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

  teaser: {
    text: string;

    /**
     * At least one additional image to be used on the home page teaser.
     */
    images: [string, ...string[]];
  };

  body: {
    Component: React.ComponentType;
  };
}

export const stories: Story[] = [
  {
    id: "amsterdam",

    visibility: "PUBLIC",
    publishedAt: new Date(Date.parse("2021-01-22")),

    title: "Amsterdam",
    date: [new Date(Date.parse("2017-05-20")), new Date(Date.parse("2017-06-01"))],

    image: "47xXYVZEjAVVyEqYs7TpphRpE52WKZ7nVXoqJPT67iX3",

    teaser: {
      text: "smombie life",
      images: ["47xXYVZEjAVVyEqYs7TpphRpE52WKZ7nVXoqJPT67iX3"],
    },

    body: {
      /**
       * A React component that renders the story body.
       */
      Component: dynamic(() => import(`./amsterdam/body.mdx`)),
    },
  },
];
