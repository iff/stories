import Wrapper from "@/timvir/wrapper";
import * as components from "@/timvir/components";
import Content from "../../../../components/Content/docs/index.mdx";

export default function Page() {
  return (
    <Wrapper>
      <Content components={components} />
    </Wrapper>
  );
}
