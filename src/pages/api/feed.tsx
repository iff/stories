import { extractBlocks } from "@/cms";
import { mediaType } from "@hapi/accept";
import { site, stories } from "content";
import { Feed } from "feed";
import * as fs from "node:fs";
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

  const { accept } = req.headers;

  const acceptedContentType = mediaType(accept, ["application/atom+xml"]);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query Feed { ${blocks.map(
            ({ id }) =>
              `b${id}: blob(name: "${id}") {
                name
                asImage { url dimensions { width height } }
                asVideo { poster { url dimensions { width height } } renditions { url } }
              }`,
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
        <Body.default
          components={{
            h1: (props: React.ComponentProps<"h1">) => <h2 {...props} />,
            h2: (props: React.ComponentProps<"h2">) => <h3 {...props} />,
            p: (props: React.ComponentProps<"p">) => <p {...props} />,
            blockquote: (props: React.ComponentProps<"blockquote">) => <blockquote {...props} />,

            Clip: (props: any) => <Clip blobs={blobs} {...props} />,
            Group: (props: any) => <Group blobs={blobs} {...props} />,
            Image: (props: any) => <Image blobs={blobs} {...props} />,
          }}
        />,
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
  const { blobs, blobId } = props;
  const blob = blobs.find((x) => x.name === blobId);
  if (!blob) {
    return <div>Image {blobId} not found!</div>;
  }

  return <img alt="" src={blob.asImage.url} />;
}

function Clip(props: any) {
  const { blobs, blobId } = props;
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
