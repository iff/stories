import { Clip } from "@/components/Clip";
import { cx } from "@linaria/core";
import { useRouter } from "next/router";
import * as React from "react";
import { Context } from "../../context";

interface Props {
  className?: string;
  clip: any;
}

export default (props: Props) => {
  const router = useRouter();
  const { storyId } = React.useContext(Context);

  const { clip, className } = props;

  return (
    <Clip
      {...props}
      id={clip.poster.hash}
      className={cx(className, "wp")}
      onFocus={() => {
        router.push(`/${storyId}/${clip.poster.hash}`);
      }}
    />
  );
};
