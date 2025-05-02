import * as stylex from "@stylexjs/stylex";

const DARK = "@media (prefers-color-scheme: dark)";

export const color = stylex.defineVars({
  background: {
    default: "#ffffff",
    [DARK]: "#18191b",
  },
  text: {
    default: "#000000",
    [DARK]: "hsla(0, 0%, 100%, 0.86)",
  },
  secondaryText: {
    default: "rgba(0, 0, 0, 0.66)",
    [DARK]: "hsla(0, 0%, 100%, 0.56)",
  },

  container: "#18191b",
  onContainer: "#ffffff",

  accent: {
    default: "#fe762a",
    [DARK]: "#fe762a",
  },
});
