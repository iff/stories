import * as fs from "node:fs";
import { lookupStory } from "content";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { importImage } from "@/cms";
import { Gallery } from "@/components/Gallery";
import { BlobProvider } from "@/components/BlobContext";

export async function generateStaticParams() {
  return [];
}

interface Params {
  storyId: string;
}

interface Props {
  params: Promise<Params>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { storyId } = await props.params;

  const story = await lookupStory(storyId);
  if (!story) {
    return {};
  }

  const blob = await importImage(story.image);

  return {
    title: story.title,
    openGraph: {
      images: blob.asImage.url,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function Page(props: Props) {
  const { storyId } = await props.params;

  const story = await lookupStory(storyId);
  if (!story) {
    return notFound();
  }

  const blobMap = await fetchBlobData({ storyId });

  // Dynamically import the MDX file
  const { default: BodyComponent } = await import(`../../../content/${storyId}/body.mdx`);

  return (
    <BlobProvider blobs={blobMap}>
      <Gallery>
        <BodyComponent />
      </Gallery>
    </BlobProvider>
  );
}

/**
 * Fetches blob data for all blobIds referenced in the story's MDX file
 * Returns a map of blobId -> blob data for use with BlobContext
 */
async function fetchBlobData({ storyId }: Params): Promise<Record<string, {
  blobId: string;
  url: string;
  width: number;
  height: number;
  placeholder?: string;
}>> {
  const mdxPath = `./content/${storyId}/body.mdx`;
  if (!fs.existsSync(mdxPath)) {
    return {};
  }

  // Read MDX file and extract all blobIds
  const body = await fs.promises.readFile(mdxPath, { encoding: "utf8" });
  const blobIdMatches = body.matchAll(/blobId=["']([^"']+)["']/g);
  const blobIds = Array.from(blobIdMatches, (m) => m[1]);
  const uniqueBlobIds = [...new Set(blobIds)];

  if (uniqueBlobIds.length === 0) {
    return {};
  }

  // Fetch blob data from GraphQL API
  const res = await fetch(`${process.env.API}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query Story { ${uniqueBlobIds.map(
        (id) =>
          `b${id}: blob(name: "${id}") {
              name
              asImage { url dimensions { width height } placeholder { url } }
            }`,
      ).join('\n')} }`,
    }),
  });
  const json = await res.json();

  // Transform to a map keyed by blobId
  const blobMap: Record<string, any> = {};
  Object.values(json.data as Record<string, any>).forEach((blob: any) => {
    if (blob && blob.name) {
      blobMap[blob.name] = {
        blobId: blob.name,
        url: blob.asImage.url,
        width: blob.asImage.dimensions.width,
        height: blob.asImage.dimensions.height,
        placeholder: blob.asImage.placeholder?.url,
      };
    }
  });

  return blobMap;
}
