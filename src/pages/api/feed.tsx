import { Feed } from "feed";
import { NextApiRequest, NextApiResponse } from "next";
import { mediaType } from "@hapi/accept";
import ReactDOMServer from "react-dom/server";
import * as React from "react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { host } = req.headers;
  if (!host) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.end("Request is missing required 'Host' header");

    return;
  }

  const { accept, ["user-agent"]: userAgent } = req.headers;

  const acceptedContentType = mediaType(accept, ["application/rss+xml"]);
  // console.log({ host, accept, userAgent, contentType: acceptedContentType });

  if (!acceptedContentType) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Content negotiation failed");

    return;
  }

  const scheme = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${scheme}://${host}`;

  const date = new Date();

  const author = {
    name: "Tomáš Čarnecký",
    email: "tomc@caurea.org",
    link: "https://caurea.org",
  };

  const feed = new Feed({
    title: `Stories by Tomáš Čarnecký`,
    description: "…for nothing remains of us but the vibrations we leave behind.",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    favicon: `${baseUrl}/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Tomáš Čarnecký`,
    updated: date,
    author,
  });

  const stories = [
    {
      id: "blouson-noir",
      title: "Blouson Noir",
      publishedAt: new Date(Date.parse("2021-11-06")),
      description: "A remote-work experiment from a small country in western asia. I spent four weeks in Armenia, traveled 2200km by car, living in a tent while working my 9to5 day job.",
    },
    {
      id: "dreamers-wake",
      title: "Dreamer's Wake",
      publishedAt: new Date(Date.parse("2021-08-08")),
      description: "Madeira wasn't my first choice where to go, but I'm glad the weather circumstances made me change my plans and go to this gorgeous island. I'll forever be grateful for the experience that I've had the chance to live through, and the people I've met.",
    },
    {
      id: "one-more-rush",
      title: "One More Rush",
      publishedAt: new Date(Date.parse("2021-05-18")),
      description:
        "I’m fortunate enough that I can work from wherever there is good internet. That covers a lot of this earths surface – and airspace.",
    },
    {
      id: "where-i-was-meant-to-be",
      title: "Where I was meant to be",
      publishedAt: new Date(Date.parse("2021-01-22")),
      description:
        "I was going through a really fucking difficult time in my life and needed to get the fuck away from comfort.",
    },
  ];

  stories.forEach((story) => {
    const url = `${baseUrl}/${story.id}`;
    const Body = require(`../../../content/${story.id}/body.mdx`).default;

    feed.addItem({
      title: story.title,
      id: url,
      link: url,
      description: story.description,
      content: ReactDOMServer.renderToStaticMarkup(<Body />),
      author: [author],
      contributor: [author],
      date: story.publishedAt,
    });
  });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/rss+xml");
  res.end(feed.rss2());
};
