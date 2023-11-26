import { extractBlocks } from "@/cms";
import { StoryById } from "@/components/Story";
import * as fs from "fs";
import { ParsedUrlQuery } from "querystring";
import { notFound } from "next/navigation";

export interface Query extends ParsedUrlQuery {
  storyId: string;
}

interface Props {
  params: {
    storyId: string;
  };
}

export default async function Page(props: Props) {
  const { storyId } = props.params;
  const blobs = await data({ storyId });

  return <StoryById storyId={storyId} blobs={blobs} />;
}

async function data({ storyId }): Promise<Array<any>> {
  await import(`../../../content/${storyId}/body.mdx`);
  if (!fs.existsSync(`./content/${storyId}/body.mdx`)) {
    return notFound();
  }

  const body = await fs.promises.readFile(`./content/${storyId}/body.mdx`, { encoding: "utf8" });
  const blocks = extractBlocks(body);

  const blobs = await (async () => {
    if (blocks.length === 0) {
      return [];
    }

    const res = await fetch(`${process.env.API}/graphql`, {
      method: "POST",
      headers: { ["Content-Type"]: "application/json" },
      body: JSON.stringify({
        query: `query { ${blocks.map(
          ({ id }) =>
            `b${id}: blob(name: "${id}") {
              name
              asImage { url dimensions { width height } placeholder { url } }
              asVideo { poster { url dimensions { width height } placeholder { url } } renditions { url } }
            }`,
        )} }`,
      }),
    });
    const json = await res.json();

    return Object.values(json.data);
  })();

  return blobs;
}