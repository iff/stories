import * as stylex from "@stylexjs/stylex";
import Link from "next/link";
import * as React from "react";

interface Props extends React.ComponentPropsWithoutRef<"a"> {
  size?: "regular" | "large";
}

function Brandmark(props: Props) {
  const { size = "regular", ...rest } = props;

  return (
    <Link href="/" {...stylex.props(styles.root, sizeVariants[size])} {...rest}>
      <div {...stylex.props(styles.name)}>^</div>
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
    color: "rgb(0.02, 0, 0)",
  },

  name: {
    fontWeight: 200,
    letterSpacing: "0.1em",
  },
});

const sizeVariants = stylex.create({
  regular: {
    fontSize: "25px",
  },

  large: {
    fontSize: "25px",
  },
});
