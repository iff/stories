import * as React from "react";
import { Body } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Body>>;

import Component from "./group.mdx";

export default async function Sample(props: Props) {
  const blocks = [{ id: "D3MkjmC2dk6jaEtepacm2AqVpDyrLkQd9D6BiQrfsMYd" }];

  const blobs = await (async () => {
    const res = await fetch(`${process.env.API}/graphql`, {
      method: "POST",
      headers: { ["Content-Type"]: "application/json" },
      body: JSON.stringify({
        query: `query Story { ${blocks.map(
          ({ id }) =>
            `b${id}: blob(name: "${id}") {
              name
              asImage { url dimensions { width height } }
              asVideo { poster { url dimensions { width height } placeholder { url } } renditions { url } }
            }`,
        )} }`,
      }),
    });
    const json = await res.json();

    return Object.values(json.data);
  })();

  return <Body storyId={"storyId"} blobs={blobs} Component={Component} {...props} />;
}
