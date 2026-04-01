"use client";

import * as stylex from "@stylexjs/stylex";
import NextImage from "next/image";
import { useBlobContext } from "@/components/BlobContext";

interface MdxImageProps {
  blobId: string;
  caption?: string;
}

function MdxImage({ blobId, caption }: MdxImageProps) {
  const blobs = useBlobContext();
  const blobData = blobs[blobId];

  if (!blobData) {
    console.error(`Blob not found: ${blobId}`);
    return null;
  }

  return (
    <div data-slide-type="image" {...stylex.props(styles.wrapper)}>
      <div {...stylex.props(styles.frame)}>
        <NextImage alt="" src={blobData.url} fill style={{ objectFit: "contain" }} />
      </div>
      {caption && <p {...stylex.props(styles.caption)}>{caption}</p>}
    </div>
  );
}

export default MdxImage;

const styles = stylex.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    gap: "0.5rem",
  },

  frame: {
    position: "relative",
    width: "min(85vw, calc((85svh - 2rem) * 3 / 2))",
    height: "min(calc(85vw * 2 / 3), calc(85svh - 2rem))",
  },

  caption: {
    fontSize: "0.75em",
    lineHeight: "1.3",
    margin: "0",
    alignSelf: "flex-start",
    width: "min(85vw, calc((85svh - 2rem) * 3 / 2))",
  },
});
