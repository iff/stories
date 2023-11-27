import { ParsedUrlQuery } from "querystring";

export interface Query extends ParsedUrlQuery {
  storyId: string;
}

interface Props {
  params: {
    storyId: string;
  };
}

export default async function Page(props: Props) {
  const { storyId } = props.params;

  await import(`../../../../content/${storyId}/body.mdx`);

  return <div>dummy</div>;
}
