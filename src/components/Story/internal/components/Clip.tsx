import { Clip } from "@/components/Clip";
import { css, cx } from "@linaria/core";
import { useRouter } from "next/router";
import * as React from "react";

interface Props {
  className?: string;
  clip: any;
}

export default (props: Props) => {
  const { clip, className } = props;
  const router = useRouter();

  return (
    <Clip
      {...props}
      id={clip.poster.hash}
      className={cx(className, "wp")}
      onFocus={() => {
        router.push(`/${router.query.storyId}/${clip.poster.hash}`);
      }}
    />
  );
};
