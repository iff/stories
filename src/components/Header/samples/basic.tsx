import * as React from "react";
import { Header } from "..";
import { importBlob } from "../../../../image.macro";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Header>>;

export default function Sample(props: Props) {
  return <Header image={importBlob("2ZfTSs9o51poWKLtqQ2X9Fo7jgKE7dK8g4CXKybZxQB2")} title="Title" {...props} />;
}
