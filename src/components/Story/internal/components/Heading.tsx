import * as stylex from "@stylexjs/stylex";
import * as React from "react";
import { cx } from "@linaria/core";

interface Props {
  children?: React.ReactNode;
}

export default function Heading_(props: Props) {
  /*
   * Hack to allow className to be appended to. Should be removed once
   * we migrate fully to StyleX.
   */
  const s = stylex.props(styles.root);

  return (
    <div {...s} className={cx("noLayout", s.className)}>
      <h2 {...stylex.props(styles.heading)} {...props} />
    </div>
  );
}

const styles = stylex.create({
  root: {
    gridColumn: "lex / rc",
  },

  heading: {
    display: "inline-block",

    margin: "2em 0 1em",
    padding: "0.55em 0.7em 0.4em",

    background: "black",
    color: "white",

    fontSize: "clamp(32px, 3.5vw, 80px)",
    lineHeight: 1.2,
    fontWeight: 900,
    letterSpacing: "0.09em",
  },
});
