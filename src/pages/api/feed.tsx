import { extractBlocks } from "@/cms";
import { Context } from "@/components/Story/context";
import { components } from "@/components/Story/internal";
import { mediaType } from "@hapi/accept";
import { MDXProvider } from "@mdx-js/react";
import { Feed } from "feed";
import * as fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import * as React from "react";
import ReactDOMServer from "react-dom/server";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { host } = req.headers;
  if (!host) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.end("Request is missing required 'Host' header");

    return;
  }

  const { accept, ["user-agent"]: userAgent } = req.headers;

  const acceptedContentType = mediaType(accept, ["application/atom+xml"]);
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
    title: `Stories`,
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
      id: "where-the-roads-collide",
      title: "Where the Roads Collide",
      publishedAt: new Date(Date.parse("2023-07-23")),
      description: "Checking another country in the Western Balkans off my bucket list.",
    },
    {
      id: "rebirth",
      title: "Rebirth",
      publishedAt: new Date(Date.parse("2023-06-07")),
      description: "A second opportunity presented itself for me to spend a few weeks in Morocco. I celebrated christmas in a dasert camp, and summitted the highest mountain of north africa on new years eve.",
    },
    {
      id: "no-end-in-sight",
      title: "No End in Sight",
      publishedAt: new Date(Date.parse("2022-12-12")),
      description: "Exploring North Macedonia's cities, mountains, and lakes during the last warm autumn days of 2022.",
    },
    {
      id: "shivering-sense",
      title: "Shivering Sense",
      publishedAt: new Date(Date.parse("2022-04-24")),
      description: "Escaping the freezing european winter weather and spending Christmas and New Years somplace warm.",
    },
    {
      id: "blouson-noir",
      title: "Blouson Noir",
      publishedAt: new Date(Date.parse("2021-11-06")),
      description:
        "A remote-work experiment from a small country in western asia. I spent four weeks in Armenia, traveled 2200km by car, living in a tent while working my 9to5 day job.",
    },
    {
      id: "dreamers-wake",
      title: "Dreamer's Wake",
      publishedAt: new Date(Date.parse("2021-08-08")),
      description:
        "Madeira wasn't my first choice where to go, but I'm glad the weather circumstances made me change my plans and go to this gorgeous island. I'll forever be grateful for the experience that I've had the chance to live through, and the people I've met.",
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

  for (const story of stories) {
    const url = `${baseUrl}/${story.id}`;
    const body = await fs.promises.readFile(`./content/${story.id}/body.mdx`, { encoding: "utf8" });
    const blocks = extractBlocks(body);

    const blobs = await (async () => {
      if (blocks.length === 0) {
        return [];
      }

      const res = await fetch(`${process.env.API}/graphql`, {
        method: "POST",
        headers: { ["Content-Type"]: "application/json" },
        body: JSON.stringify({
          query: `query Feed { ${blocks.map(
            ({ id }) =>
              `b${id}: blob(name: "${id}") {
                name
                asImage { url dimensions { width height } }
                asVideo { poster { url dimensions { width height } } renditions { url } }
              }`
          )} }`,
        }),
      });
      const json = await res.json();

      return Object.values(json.data);
    })();

    const Body = await require(`../../../content/${story.id}/body.mdx`);

    feed.addItem({
      title: story.title,
      id: url,
      link: url,
      description: story.description,
      content: ReactDOMServer.renderToStaticMarkup(
        <Context.Provider value={{ storyId: story.id, blobs }}>
          <MDXProvider components={{ ...components, Image, Clip, Group }}>
            <Body.default />
          </MDXProvider>
        </Context.Provider>
      ),
      author: [author],
      contributor: [author],
      date: new Date(),
      published: story.publishedAt,
    });
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/atom+xml");
  res.end(feed.atom1());
};

function Image(props: any) {
  const { storyId, blobs } = React.useContext(Context);

  const { blobId, size, className, ...rest } = props;
  const blob = blobs.find((x) => x.name === blobId);
  if (!blob) {
    return <div>Image {blobId} not found!</div>;
  }

  return <img src={blob.asImage.url} />;
}

function Clip(props: any) {
  const { storyId, blobs } = React.useContext(Context);

  const { blobId, size, className, ...rest } = props;
  const blob = blobs.find((x) => x.name === blobId);

  return (
    <video>
      <source src={blob.asVideo.renditions[0].url} type="video/mp4" />
    </video>
  );
}

function Group(props: any) {
  return <>{props.children}</>;
}
