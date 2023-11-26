import type { Metadata, Viewport } from "next";

import "../style.linaria.global";

export const metadata: Metadata = {
  title: "Stories by Tomáš Čarnecky",
};

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  viewportFit: "cover",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="module" dangerouslySetInnerHTML={{ __html: themeDetector }} />
      </head>

      <body>{children}</body>
    </html>
  );
}

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
