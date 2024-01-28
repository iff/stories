import { extractBlocks } from "@/cms";
import { Context } from "@/components/Story/context";
import { components } from "@/components/Story/internal";
import { mediaType } from "@hapi/accept";
import { MDXProvider } from "@mdx-js/react";
import { site, stories } from "content";
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
    name: site.author.name,
    email: site.author.email,
  };

  const feed = new Feed({
    title: site.title,
    description: site.byline,
    id: baseUrl,
    link: baseUrl,
    language: "en",
    favicon: `${baseUrl}/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, ${site.author.name}`,
    updated: date,
    author,
  });

  const storiesForFeed = stories
    .flatMap((x) => {
      if (x.visibility === "PUBLIC" && x.publishedAt !== null) {
        return [{ ...x, publishedAt: x.publishedAt }];
      } else {
        return [];
      }
    })
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  for (const story of storiesForFeed) {
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
      description: story.teaser.text,
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
