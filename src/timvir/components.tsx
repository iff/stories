import { Code } from "timvir/blocks";

export * from "timvir/builtins";

export function pre(props) {
  const [, language = "markdown"] = (props.children?.props?.className || "").match(/^language-(.*)$/) || [];
  return <Code language={language}>{props.children.props.children}</Code>;
}
