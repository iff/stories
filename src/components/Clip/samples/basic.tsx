import * as React from "react";
import { Clip } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Clip>>;

export default function Sample(props: Props) {
  return <Clip {...props} />;
}
