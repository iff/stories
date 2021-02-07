import { css } from "@linaria/core";
import Head from "next/head";
import { IntlProvider } from "react-intl";

function App({ Component, pageProps }) {
  return (
    <IntlProvider locale="en" defaultLocale="en">
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </IntlProvider>
  );
}

export default App;

/*
 * Global CSS
 */
css`
  :global() {
    html,
    body {
      padding: 0;
      margin: 0;
      box-sizing: border-box;

      overscroll-behavior: none;

      font-family: 'iA Writer Quattro', monospace;

      font-size: 14px;
      line-height: 1.6;

      @media (min-width: 720px) {
        font-size: 16px;
        line-height: 1.6;
      }

      @media (min-width: 1280px) {
        font-size: 19px;
        line-height: 1.6;
      }
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }
  }
`;

/*
 * Font
 */
css`
  :global() {
    @font-face {
      font-family: "iA Writer Quattro";
      font-weight: normal;
      font-style: normal;
      src: url("/fonts/iAWriterQuattroS-Regular.woff2") format("woff2");
      font-display: swap;
    }
    
    @font-face {
      font-family: "iA Writer Quattro";
      font-weight: bold;
      font-style: bold;
      src: url("/fonts/iAWriterQuattroS-Bold.woff2") format("woff2");
      font-display: swap;
    }
  }
`;
