import "../style.linaria.global";

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
