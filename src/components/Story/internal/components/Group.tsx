import { Group } from "@/components/Group";
import { css, cx } from "@linaria/core";
import * as React from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export default function Group_(props: Props) {
  const { className } = props;

  return <Group {...props} className={cx(className, "wp")} />;
}
