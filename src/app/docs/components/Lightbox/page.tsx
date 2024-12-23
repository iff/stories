import * as components from "@/timvir/components";
import Wrapper from "@/timvir/wrapper";
import Content from "../../../../components/Lightbox/docs/index.mdx";

export default function Page() {
  return (
    <Wrapper>
      <Content components={components} />
    </Wrapper>
  );
}
