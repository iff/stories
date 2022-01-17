import { Image } from "@/components/Image";
import { css, cx } from "@linaria/core";
import * as React from "react";
import { Context } from "../../context";

interface Props {
  blobId?: string;
  image?: any;
  size?: any;

  className?: string;
}

export default function Image_(props: Props) {
  const { storyId, blobs } = React.useContext(Context);

  const { blobId, image, size, className } = props;
  const blob = blobs.find((x) => x.name === blobId);

  const id = blobId ?? image?.hash;

  return (
    <Image
      {...props}
      href={`/${storyId}/${id}`}
      {...(() => {
        if (!blob) {
          return {};
        } else {
          return { image: blob.asImage };
        }
      })()}
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
    />
  );
}
