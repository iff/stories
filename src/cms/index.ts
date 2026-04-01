import { execute, graphql } from "@/graphql";

async function importBlob(name: string) {
  const BlobQuery = graphql(`
    query Blob($name: String!) {
      blob(name: $name) {
        id
        name

        asImage {
          url
          dimensions {
            width
            height
          }
          placeholder {
            url
          }
        }

        asVideo {
          poster {
            url
            dimensions {
              width
              height
            }
            placeholder {
              url
            }
          }
          renditions {
            url

            dimensions {
              width
              height
            }
          }
        }
      }
    }
  `);

  const { data } = await execute(BlobQuery, { name });
  if (!data || !data.blob) {
    throw new Error(`Blob ${name} not found`);
  }

  return data.blob;
}

export async function importImage(name: string) {
  const blob = await importBlob(name);
  if (!blob.asImage) {
    throw new Error(`Blob ${name} not Image`);
  }

  return {
    ...blob,
    asImage: blob.asImage,
  };
}
