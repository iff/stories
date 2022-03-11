import { Image } from "@/components/Image";
import { css, cx } from "@linaria/core";
import * as React from "react";
import { Context } from "../../context";

interface Props {
  blobId: string;

  size?: "narrow" | "wp" | "fw";

  className?: string;
}

export default function Image_(props: Props) {
  const { storyId, blobs } = React.useContext(Context);

  const { blobId, size, className, ...rest } = props;
  const blob = blobs.find((x) => x.name === blobId);
  if (!blob) {
    return <div>Image {blobId} not found!</div>;
  }

  return (
    <Image
      id={blobId}
      href={`/${storyId}/${blobId}`}
      image={blob.asImage}
      className={cx(
        className,
        {
          full: "fw",
          wide: "wp",
        }[size],
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
