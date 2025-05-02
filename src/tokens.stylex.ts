import * as stylex from "@stylexjs/stylex";

const DARK = "@media (prefers-color-scheme: dark)";

export const color = stylex.defineVars({
  accent: {
    default: "#fe762a",
    [DARK]: "#fe762a",
  },
});
