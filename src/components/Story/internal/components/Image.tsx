import * as stylex from "@stylexjs/stylex";
import * as React from "react";

import { Image } from "@/components/Image";
import { cx } from "@linaria/core";

interface Props {
  blobs: Array<any>;
  storyId: string;
  blobId: string;

  size?: "narrow" | "wp" | "fw";

  className?: string;
}

export default function Image_(props: Props) {
  const { storyId, blobs, blobId, size, className, ...rest } = props;

  const blob = blobs.find((x) => x.name === blobId);
  if (!blob) {
    return <div>Image {blobId} not found!</div>;
  }

  /*
   * Hack to allow className to be appended to. Should be removed once
   * we migrate fully to StyleX.
   */
  const s = stylex.props(styles.root, size === "narrow" && styles.narrow);

  return (
    <Image
      id={blobId}
      href={`/${storyId}/${blobId}`}
      blob={blob}
      {...s}
      className={cx(
        s.className,
        size
          ? {
              full: "fw",
              wide: "wp",
            }[size]
          : "",
        className
      )}
      {...rest}
    />
  );
}

const styles = stylex.create({
  root: {
    margin: "0 auto !important",
  },

  narrow: {
    maxWidth: 400,
  },
});
