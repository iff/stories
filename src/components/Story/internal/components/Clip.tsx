import { Clip } from "@/components/Clip";
import { cx } from "@linaria/core";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Context } from "../../context";

interface Props {
  blobId: string;
  className?: string;
}

export default function Clip_(props: Props) {
  const router = useRouter();
  const { storyId, blobs } = React.useContext(Context);

  const { blobId, className } = props;
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
