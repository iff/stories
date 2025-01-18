import * as stylex from "@stylexjs/stylex";
import * as React from "react";

import { Image } from "@/components/Image";

interface Props {
  blobs: Array<any>;
  storyId: string;
  blobId: string;

  size?: "narrow" | "wide" | "full";
}

export default function Image_(props: Props) {
  const { storyId, blobs, blobId, size, ...rest } = props;

  const blob = blobs.find((x) => x.name === blobId);
  if (!blob) {
    return <div>Image {blobId} not found!</div>;
  }

  return (
    <Image
      id={blobId}
      href={`/${storyId}/${blobId}`}
      blob={blob}
      {...stylex.props(styles.root, size && styles[size])}
      {...rest}
    />
  );
}

const styles = stylex.create({
  root: {
    gridColumn: "lc / rc",
  },

  narrow: {
    margin: "0 auto !important",
    maxWidth: 400,
  },
  wide: {
    gridColumn: "lex / rex",
  },
  full: {
    gridColumn: "le / re",
  },
});
