import { Head, Html, Main, NextScript } from "next/document";

function Document() {
  return (
    <Html lang="en">
      <Head>
        <script type="module" dangerouslySetInnerHTML={{ __html: themeDetector }} />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;

const themeDetector = `
const mqls = Object.fromEntries(
  ["light", "dark"].map((colorScheme) => [
    colorScheme,
    (() => {
      const mql = window.matchMedia(\`(prefers-color-scheme: \${colorScheme})\`);
      mql.addEventListener("change", applyTheme);
      return mql;
    })(),
  ])
);

applyTheme();
function applyTheme() {
  const theme = detectTheme();
  if (theme) {
    useTheme(theme);
  }
}

function detectTheme() {
  try {
    const theme = localStorage.getItem("theme");
    if (theme) {
      return theme;
    }
  } catch {}

  for (const [colorScheme, mql] of Object.entries(mqls)) {
    if (mql.matches) {
      return colorScheme;
    }
  }
}

function useTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("data-timvir-theme", theme);
}
`;
