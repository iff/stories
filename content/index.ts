import dynamic from "next/dynamic";
import * as React from "react";

export const site = {
  title: "Lenses",
  byline: "sometimes the lense with which I perceive the world is a physical device attached to a camera",

  author: {
    name: "Yves Ineichen",
    email: "y@y.io",
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
    id: "hawaii",

    visibility: "PUBLIC",
    publishedAt: new Date(Date.parse("2020-01-01")),

    title: "Hawaii",
    date: [new Date(Date.parse("2016-11-15")), new Date(Date.parse("2016-12-01"))],

    image: "GzkGi2tBqxRFQ3efnr5Kxa64tX56hb4fbnK5tTWM5a9k",

    teaser: {
      text: "fairytale island",
      images: ["GNm6m1gnH9TiRwYrrgsmg3HdVRjEWDZTW1xAYmoJuHNR"],
    },

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
    date: [new Date(Date.parse("2017-05-20")), new Date(Date.parse("2017-06-01"))],

    image: "47xXYVZEjAVVyEqYs7TpphRpE52WKZ7nVXoqJPT67iX3",

    teaser: {
      text: "smombie life",
      images: ["Gh83ou9cqktKK9PBZLukuDviJ7Dvfqf1ep5zcZ3KA5kn"],
    },

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
    date: [new Date(Date.parse("2019-01-31")), new Date(Date.parse("2019-02-10"))],

    image: "6hkdp7oJ9g8qqzGcP9AAXrv9xk6S9GTUPB42J1YAYXeX",

    teaser: {
      text: "colorful remoteness",
      images: ["2XeYAL9caXND6XJB1988dfnS4ZWVkc94aFM5SSNoeyYw"],
    },

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
    date: [new Date(Date.parse("2021-03-06")), new Date(Date.parse("2021-03-06"))],

    image: "C673XbvFp8M5k899he4QNmj919yu5uMsBbckNfNyUVqT",

    teaser: {
      text: "unexpected separation",
      images: ["9ECapbRAJzBu2BoZ6UG47EzRxDJFgAdr9xiTPF5VTcst"],
    },

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
    date: [new Date(Date.parse("2020-01-01")), new Date(Date.parse("2024-02-10"))],

    image: "HMzyN2b5oADqoKsK29WZjxebYWWUWhZ7PZQ3HQyzn8WV",

    teaser: {
      text: "second home",
      images: ["BGthNqJjncN8r8kqddsKU9rzcRGvSJfY3iXFc8cpNFge"],
    },

    body: {
      /**
       * A React component that renders the story body.
       */
      Component: dynamic(() => import(`./bavona/body.mdx`)),
    },
  },
];
