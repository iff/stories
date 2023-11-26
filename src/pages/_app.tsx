import { AppProps } from "next/app";
import Head from "next/head";
import { IntlProvider } from "react-intl";
import "../style.global.css";

const baseUrl = process.env.NODE_ENV === "production" ? `https://stories.caurea.org` : "http://localhost:3000";

function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <IntlProvider locale="en" defaultLocale="en">
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.png" />

        {/* Feed */}
        <link rel="alternate" type="application/rss+xml" title="Stories by Tomáš Čarnecky" href={`${baseUrl}/feed`} />
      </Head>

      <Component {...pageProps} />
    </IntlProvider>
  );
}

export default App;
