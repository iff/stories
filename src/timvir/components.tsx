import * as React from "react";
import { Code } from "timvir/blocks";
import * as builtins from "timvir/builtins";

function pre(props: React.HTMLProps<HTMLPreElement>) {
  if (!props.children || !React.isValidElement(props.children)) {
    return null;
  }

  const { className, children } = props.children.props as { className?: string; children: string };

  const [, language = "markdown"] = (className || "").match(/^language-(.*)$/) || [];
  return <Code language={language}>{children}</Code>;
}

export const mdxComponents = {
  ...builtins,
  pre,
};
