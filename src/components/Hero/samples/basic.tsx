import * as React from "react";
import { Hero } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Hero>>;

export default function Sample(props: Props) {
  return (
    <div style={{ minHeight: 600 }}>
      <Hero {...props} />
    </div>
  );
}
