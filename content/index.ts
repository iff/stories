import dynamic from "next/dynamic";
import * as React from "react";

export const site = {
  title: "Stories",
  byline: "…for nothing remains of us but the vibrations we leave behind.",

  author: {
    name: "Tomáš Čarnecký",
    email: "tomc@caurea.org",
  },
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

  teaser: {
    text: string;

    /**
     * At least one additional image to be used on the home page teaser.
     */
    images: [string, ...string[]];
  };

  body: {
    Component: React.ComponentType
  }
}

export const stories: Story[] = [
  {
    id: "where-i-was-meant-to-be",

    visibility: "PUBLIC",
    publishedAt: new Date(Date.parse("2021-01-22")),

    title: "Where I was meant to be",
    date: [new Date(Date.parse("2021-01-05")), new Date(Date.parse("2021-01-19"))],

    image: "2ZfTSs9o51poWKLtqQ2X9Fo7jgKE7dK8g4CXKybZxQB2",

    teaser: {
      text: "I was going through a really fucking difficult time in my life and needed to get the fuck away from comfort.",
      images: ["4urziJ8cBEYCJxWdGWZriVDwi966AxQZRxYsVCT4hjjv"],
    },

    body: {
      /**
       * A React component that renders the story body.
       */
      Component: dynamic(() => import(`./where-i-was-meant-to-be/body.mdx`)),
    },
  },

  {
    id: "one-more-rush",

    visibility: "PUBLIC",
    publishedAt: new Date(Date.parse("2021-05-18")),

    title: "One More Rush",
    date: [new Date(Date.parse("2021-03-28")), new Date(Date.parse("2021-05-07"))],

    image: "4zfWtmEUAz4bPvkAHZUVrdik83FJtWZkZ2eJ1cYkZ7Kc",

    teaser: {
      text: "I’m fortunate enough that I can work from wherever there is good internet. That covers a lot of this earths surface – and airspace.",
      images: ["G2RyoGrTfkSnw37DBsyVP4JGgcEMB33NR4AfJ5HBssG9"],
    },

    body: {
      Component: dynamic(() => import(`./one-more-rush/body.mdx`)),
    },
  },

  {
    id: "dreamers-wake",

    visibility: "PUBLIC",
    publishedAt: new Date(Date.parse("2021-08-08")),

    title: "Dreamer's Wake",
    date: [new Date(Date.parse("2021-06-26")), new Date(Date.parse("2021-07-13"))],

    image: "5zuDhsdMcMz7Cvk97Vr2ErDiQb8SYknUPiemgeJmgsCa",

    teaser: {
      text: "Madeira wasn't my first choice where to go, but I'm glad the weather circumstances made me change my plans and go to this gorgeous island. I'll forever be grateful for the experience that I've had the chance to live through, and the people I've met.",
      images: ["2jQPQHZQUdWZM1KiHDiYWzZs3LF6aTWBK8diCZPo3kcd"],
    },

    body: {
      Component: dynamic(() => import(`./dreamers-wake/body.mdx`)),
    },
  },

  {
    id: "blouson-noir",

    visibility: "PUBLIC",
    publishedAt: new Date(Date.parse("2021-11-06")),

    title: "Blouson Noir",
    date: [new Date(Date.parse("2021-09-13")), new Date(Date.parse("2021-10-16"))],

    image: "CbAA5a6fa9Qdb7E6gCnfNVx5UXbAxwLXGxAP5PDDMqYV",

    teaser: {
      text: "A remote-work experiment from a small country in western asia. I spent four weeks in Armenia, traveled 2200km by car, living in a tent while working my 9to5 day job.",
      images: ["94CwSoC6ZdyDJof7juAxMo9gpyUkhKDhZgSTDeeYrz2Z"],
    },

    body: {
      Component: dynamic(() => import(`./blouson-noir/body.mdx`)),
    },
  },

  {
    id: "shivering-sense",

    visibility: "PUBLIC",
    publishedAt: new Date(Date.parse("2022-04-24")),

    title: "Shivering Sense",
    date: [new Date(Date.parse("2021-12-19")), new Date(Date.parse("2022-02-16"))],

    image: "BefU8tziWMjkR6YWg5Tt5187xsdkkXp2ro5zSA6FYTWW",

    teaser: {
      text: "Escaping the freezing european winter weather and spending Christmas and New Years somplace warm.",
      images: ["4U6KQvhw1RBh3LRsfUm3YKYzcinDGEfmWWsu5mK8LwKS"],
    },

    body: {
      Component: dynamic(() => import(`./shivering-sense/body.mdx`)),
    },
  },

  {
    id: "no-end-in-sight",

    visibility: "PUBLIC",
    publishedAt: new Date(Date.parse("2022-12-12")),

    title: "No End in Sight",
    date: [new Date(Date.parse("2022-10-26")), new Date(Date.parse("2022-11-13"))],

    image: "ARSdapw2zdSqg2mBAePGixd7z7oPzythmAafqogNCVjd",

    teaser: {
      text: "Exploring North Macedonia's cities, mountains, and lakes during the last warm autumn days of 2022.",
      images: ["8T5Xc8AYcWk7VcCPSZmScwZiXBjgrWZdTBMqd7w8x7dv"],
    },

    body: {
      Component: dynamic(() => import(`./no-end-in-sight/body.mdx`)),
    },
  },

  {
    id: "rebirth",

    visibility: "PUBLIC",
    publishedAt: new Date(Date.parse("2023-06-07")),

    title: "Rebirth",
    date: [new Date(Date.parse("2022-12-14")), new Date(Date.parse("2023-01-15"))],

    image: "3hTEGq6HsHYSQzVd1qP8Z7UwK7J2Ggm5U5YC6PdQjHVU",

    teaser: {
      text: "A second opportunity presented itself for me to spend a few weeks in Morocco. I celebrated christmas in a dasert camp, and summitted the highest mountain of north africa on new years eve.",
      images: ["ComZXKPfxqaKvk4nPd772JPNyjGj2QR7JrbdPFg16Pdt"],
    },

    body: {
      Component: dynamic(() => import(`./rebirth/body.mdx`)),
    },
  },

  {
    id: "where-the-roads-collide",

    visibility: "PUBLIC",
    publishedAt: new Date(Date.parse("2023-07-23")),

    title: "Where the Roads Collide",
    date: [new Date(Date.parse("2023-06-05")), new Date(Date.parse("2023-06-26"))],

    image: "FvWPgxfsmWHtaUmzuNSte99GMM5Rtiu2CiKMJnZgXbfR",

    teaser: {
      text: "Checking another country in the Western Balkans off my bucket list.",
      images: ["7yWSUn7qFfaaRoiPk9UrtTeXDLFULHVpd7RYTLc1t1Vo", "2uDPdSfjM7rcAm5gN12YUFzvs4qPChL9rukXrgsPKwyS"],
    },

    body: {
      Component: dynamic(() => import(`./where-the-roads-collide/body.mdx`)),
    },
  },

  {
    id: "kindest-regards",

    visibility: "PUBLIC",
    publishedAt: new Date(Date.parse("2024-01-06")),

    title: "Kindest Regards",
    date: [new Date(Date.parse("2023-08-18")), new Date(Date.parse("2023-09-17"))],

    image: "B9uJRSuzBxXBpBhAKZAYm1S35wD6s2sH2RixcN9G8Wax",

    teaser: {
      text: "Fying over 9000 kilometers just to attend a 3 day workshop is wasteful. Why not stay a bit longer?",
      images: ["EpLn9QA3f1b53Jgr6uut7zDCHXMArXsrzEX9rVVJqv63"],
    },

    body: {
      Component: dynamic(() => import(`./kindest-regards/body.mdx`)),
    },
  }
]
