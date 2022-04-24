import { css } from "@linaria/core";

export const themes = {
  light: {
    backgroundColor: "#ffffff",
    textColor: "#000000",
    secondaryTextColor: "rgba(0 0 0 / 0.66)",
  },
  dark: {
    backgroundColor: "#18191b",
    textColor: "rgba(255 255 255 / 0.86)",
    secondaryTextColor: "rgba(255 255 255 / 0.56)",
  },
} as const;

css`
  
`;

export function mkTheme(config: typeof themes[keyof typeof themes]) {
  return `
    --background-color: ${config.backgroundColor};
    --text-color: ${config.textColor};
    --secondary-text-color: ${config.secondaryTextColor};
  `;
}
