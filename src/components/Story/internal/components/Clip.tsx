"use client";

import * as stylex from "@stylexjs/stylex";
import * as React from "react";

import { Clip } from "@/components/Clip";
import { useRouter } from "next/navigation";

interface Props {
  storyId: string;
  blobs: Array<any>;
  blobId: string;
}

export default function Clip_(props: Props) {
  const router = useRouter();

  const { storyId, blobs, blobId } = props;
  const blob = blobs.find((x) => x.name === blobId);

  return (
    <Clip
      {...props}
      id={blobId}
      video={blob?.asVideo}
      onFocus={() => {
        router.push(`/${storyId}/${blobId}`);
      }}
      sx={styles.root}
    />
  );
}

const styles = stylex.create({
  root: {
    gridColumn: "lex / rex",
  },
});
