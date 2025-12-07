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

  // Calculate constrained dimensions to fit within viewport
  const maxWidth = typeof window !== 'undefined' ? window.innerWidth * 0.85 : 1200;
  const maxHeight = typeof window !== 'undefined' ? window.innerHeight * 0.85 - 50 : 800;

  let constrainedWidth = blobData.width;
  let constrainedHeight = blobData.height;

  // Scale down if needed
  const widthRatio = maxWidth / blobData.width;
  const heightRatio = maxHeight / blobData.height;
  const scale = Math.min(widthRatio, heightRatio, 1); // Don't scale up

  if (scale < 1) {
    constrainedWidth = Math.round(blobData.width * scale);
    constrainedHeight = Math.round(blobData.height * scale);
  }

  // Transform blob data to match Image component's expected format
  const blob = {
    name: blobId,
    asImage: {
      url: blobData.url,
      dimensions: {
        width: constrainedWidth,
        height: constrainedHeight,
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
    height: "100vh",
    maxHeight: "100vh",
    boxSizing: "border-box",
    overflow: "hidden",
    position: "relative",
  },

  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    maxWidth: "85vw",
    maxHeight: "85vh",
    width: "auto",
    height: "auto",

    // Constrain the figure element
    ":where(figure)": {
      maxWidth: "100%",
      maxHeight: "100%",
      width: "auto",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      contain: "size",
    },

    // Constrain the link/div wrapper inside figure
    ":where(figure > div), :where(figure > a)": {
      maxWidth: "100%",
      maxHeight: "calc(85vh - 3rem)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },

    // Constrain the img inside
    ":where(img)": {
      maxWidth: "100% !important",
      maxHeight: "calc(85vh - 3rem) !important",
      width: "auto !important",
      height: "auto !important",
      objectFit: "contain !important",
    },

    // Left-align caption
    ":where(figcaption)": {
      alignSelf: "flex-start",
      width: "100%",
      flexShrink: 0,
    },
  },
});
