import { Clip } from "@/components/Clip";
import { cx } from "@linaria/core";
import { useRouter } from "next/router";
import * as React from "react";
import { Context } from "../../context";

interface Props {
  blobId?: string;
  clip: any;

  className?: string;
}

export default (props: Props) => {
  const router = useRouter();
  const { storyId, blobs } = React.useContext(Context);

  const { blobId, clip, className } = props;
  const blob = blobs.find((x) => x.name === blobId);

  const id = blobId ?? clip.poster.hash;

  return (
    <Clip
      {...props}
      id={id}
      video={blob?.asVideo}
      clip={props.clip}
      className={cx(className, "wp")}
      onFocus={() => {
        router.push(`/${storyId}/${id}`);
      }}
    />
  );
};
