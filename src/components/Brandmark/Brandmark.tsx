import * as stylex from "@stylexjs/stylex";
import * as React from "react";

import { color } from "@/tokens.stylex";

import Link from "next/link";

interface Props extends React.ComponentPropsWithoutRef<"a"> {
  size?: "regular" | "large";
}

function Brandmark(props: Props, ref: React.ForwardedRef<React.ComponentRef<"a">>) {
  const { size = "regular", ...rest } = props;

  return (
    <Link ref={ref} href="/" {...stylex.props(styles.root, sizeVariants[size])} {...rest}>
      <div {...stylex.props(styles.name)}>Stories</div>
      <div {...stylex.props(styles.byline)}>by Tomáš Čarnecký</div>
    </Link>
  );
}

export default React.forwardRef(Brandmark);

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
    opacity: 0.75,
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
