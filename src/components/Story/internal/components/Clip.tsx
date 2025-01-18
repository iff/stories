"use client";

import { Clip } from "@/components/Clip";
import { cx } from "../../../../cx";
import { useRouter } from "next/navigation";
import * as React from "react";

interface Props {
  storyId: string;
  blobs: Array<any>;
  blobId: string;
  className?: string;
}

export default function Clip_(props: Props) {
  const router = useRouter();

  const { storyId, blobs, blobId, className } = props;
  const blob = blobs.find((x) => x.name === blobId);

  return (
    <Clip
      {...props}
      id={blobId}
      video={blob?.asVideo}
      className={cx(className, "wp")}
      onFocus={() => {
        router.push(`/${storyId}/${blobId}`);
      }}
    />
  );
}
