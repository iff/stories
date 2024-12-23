import { Code } from "timvir/blocks";

export * from "timvir/builtins";

export function pre(props: any) {
  const [, language = "markdown"] = (props.children?.props?.className || "").match(/^language-(.*)$/) || [];
  return <Code language={language}>{props.children.props.children}</Code>;
}
