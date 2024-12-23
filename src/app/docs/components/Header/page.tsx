import * as components from "@/timvir/components";
import Wrapper from "@/timvir/wrapper";
import Content from "../../../../components/Header/docs/index.mdx";

export default function Page() {
  return (
    <Wrapper>
      <Content components={components} />
    </Wrapper>
  );
}
