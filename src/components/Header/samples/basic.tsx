import * as React from "react";
import { importImage } from "@/cms";
import { Header } from "..";

type Props = Partial<React.ComponentPropsWithoutRef<typeof Header>>;

export default async function Sample(props: Props) {
  return <Header blob={await importImage("2ZfTSs9o51poWKLtqQ2X9Fo7jgKE7dK8g4CXKybZxQB2")} title="Title" {...props} />;
}
