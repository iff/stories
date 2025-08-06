import * as stylex from "@stylexjs/stylex";
import Link from "next/link";
import * as React from "react";
import { color } from "@/tokens.stylex";

interface Props extends React.ComponentPropsWithoutRef<"a"> {
  size?: "regular" | "large";
}

function Brandmark(props: Props) {
  const { size = "regular", ...rest } = props;

  return (
    <Link href="/" {...stylex.props(styles.root, sizeVariants[size])} {...rest}>
      <div {...stylex.props(styles.name)}>Stories</div>
      <div {...stylex.props(styles.byline)}>by Tomáš Čarnecký</div>
    </Link>
  );
}

export default Brandmark;

const styles = stylex.create({
  root: {
    display: "block",
    textDecoration: "none",
    textAlign: "center",
    fontSize: "clamp(32px, 3.5vw, 80px)",
    lineHeight: 1,
    padding: "0.5em 0.7em",
    backgroundColor: color.container,
    color: color.onContainer,
  },

  name: {
    fontWeight: 900,
    letterSpacing: "0.11em",
  },

  byline: {
    fontSize: "0.45em",
    paddingTop: "0.2em",
    color: color.onContainerSecondary,
  },
});

const sizeVariants = stylex.create({
  regular: {
    fontSize: "clamp(32px, 3.5vw, 80px)",
  },

  large: {
    fontSize: "clamp(44px, 4vw, 80px)",
  },
});
