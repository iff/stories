'use client'

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { useBlobContext } from '@/components/BlobContext';
import { Image } from '@/components/Image';

interface MdxImageProps {
  blobId: string;
  caption?: string;
  size?: 'normal' | 'wide';
  span?: number | number[];
  aspectRatio?: number;
}

/**
 * MDX wrapper for Image component - fetches blob data from context
 * Used in body.mdx files with just blobId
 */
function MdxImage({ blobId, caption, size, span, aspectRatio }: MdxImageProps) {
  const blobs = useBlobContext();
  const blobData = blobs[blobId];

  if (!blobData) {
    console.error(`Blob not found: ${blobId}`);
    return null;
  }

  // Transform blob data to match Image component's expected format
  const blob = {
    name: blobId,
    asImage: {
      url: blobData.url,
      dimensions: {
        width: blobData.width,
        height: blobData.height,
      },
      placeholder: blobData.placeholder ? {
        url: blobData.placeholder
      } : undefined,
    },
  };

  return (
    <div data-slide-type="image" {...stylex.props(styles.wrapper)}>
      <div {...stylex.props(styles.imageContainer)}>
        <Image
          blob={blob}
          caption={caption}
          span={span}
          aspectRatio={aspectRatio}
        />
      </div>
    </div>
  );
}

// Add slideType as a static property for Gallery to identify
MdxImage.slideType = 'image' as const;

export default MdxImage;

const styles = stylex.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    overflow: "hidden",
  },

  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    maxWidth: "min(85vw, 1200px)",
    maxHeight: "85vh",

    // Constrain the figure element
    ":where(figure)": {
      maxWidth: "100%",
      maxHeight: "calc(85vh - 3rem)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.5rem",
    },

    // Constrain the img inside
    ":where(img)": {
      maxWidth: "100%",
      maxHeight: "calc(85vh - 4rem)",
      width: "auto !important",
      height: "auto !important",
      objectFit: "contain",
    },

    // Left-align caption
    ":where(figcaption)": {
      alignSelf: "flex-start",
      width: "100%",
    },
  },
});
