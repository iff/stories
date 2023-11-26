import * as React from "react";

interface Props {
  params: { storyId: string; }
}

export default async function Page(props: Props) {
  const { storyId } = props.params;
  const { default: Image } = await import(`../../../../content/${storyId}/image`);
  return <Image />;
}
