import { Image } from "@/components/Image";
import { css, cx } from "@linaria/core";
import * as React from "react";

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

  return (
    <Image
      id={blobId}
      href={`/${storyId}/${blobId}`}
      blob={blob}
      className={cx(
        className,
        size
          ? {
              full: "fw",
              wide: "wp",
            }[size]
          : "",
        css`
          margin: 0 auto;
        `,
        size === "narrow" &&
          css`
            max-width: 400px;
          `
      )}
      {...rest}
    />
  );
}
