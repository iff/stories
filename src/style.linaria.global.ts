import { mkTheme, themes } from "@/theme";
import { css } from "@linaria/core";

css`
  :global() {
    :root {
      -webkit-text-size-adjust: 100%;
    }
    html,
    body {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      overscroll-behavior: none;
      font-family: "Tuna", system-ui, sans-serif;
      /*
       * Font size goes from 17px to 21px, changes
       * at fixed breakpoints.
       */
      font-size: 17px;
      line-height: 1.8;
      color: var(--text-color);
      background-color: var(--background-color);
      @media (min-width: 720px) {
        font-size: 19px;
        line-height: 1.7;
      }
      @media (min-width: 1280px) {
        font-size: 21px;
        line-height: 1.6;
      }
    }
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
  }
  :global() {
    :root {
      color-scheme: light;
      ${mkTheme(themes.light)};
    }
    @media (prefers-color-scheme: dark) {
      :root {
        color-scheme: dark;
        ${mkTheme(themes.dark)};
      }
    }
  }
  :global() {
    /* Tuna Light */
    @font-face {
      font-family: Tuna;
      font-style: normal;
      font-weight: 300;
      src: url("/fonts/Tuna/371F3E_3_0.woff2") format("woff2");
      font-display: swap;
    }
    /* Tuna LightItalic */
    @font-face {
      font-family: Tuna;
      font-style: italic;
      font-weight: 300;
      src: url("/fonts/Tuna/371F3E_5_0.woff2") format("woff2");
      font-display: swap;
    }
    /* Tuna Regular */
    @font-face {
      font-family: Tuna;
      font-style: normal;
      font-weight: 400;
      src: url("/fonts/Tuna/371F3E_7_0.woff2") format("woff2");
      font-display: swap;
    }
    /* Tuna RegularItalic */
    @font-face {
      font-family: Tuna;
      font-style: italic;
      font-weight: 400;
      src: url("/fonts/Tuna/371F3E_9_0.woff2") format("woff2");
      font-display: swap;
    }
    /* Tuna Bold */
    @font-face {
      font-family: Tuna;
      font-style: normal;
      font-weight: 700;
      src: url("/fonts/Tuna/371F3E_0_0.woff2") format("woff2");
      font-display: swap;
    }
    /* Tuna BoldItalic */
    @font-face {
      font-family: Tuna;
      font-style: italic;
      font-weight: 700;
      src: url("/fonts/Tuna/371F3E_1_0.woff2") format("woff2");
      font-display: swap;
    }
  }
`;
