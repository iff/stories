"use client";

import * as stylex from "@stylexjs/stylex";
import * as React from "react";

interface Props {
  children: React.ReactNode;
}

export function TextSlide(props: Props) {
  const { children } = props;

  return (
    <div {...stylex.props(styles.textSlide)}>
      <div {...stylex.props(styles.textContent)}>{children}</div>
    </div>
  );
}

const styles = stylex.create({
  textSlide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    width: "100%",
    height: "100%",
    overflowY: "auto",
  },

  textContent: {
    maxWidth: "700px",
    width: "100%",
    margin: "0 auto",
    padding: "2rem",
  },
});
