export function sanitizeTitle(s: string): string {
  return s
    .replaceAll(/[\/:*\?"<>|\s\.\(\)]+/g, "-")
    .replace(/-+$/g, "")
    .replace(/^-/, "")
    .replace(/-$/, "")
    .toLowerCase();
}

export const build = process.env.GITHUB_RUN_ID
  ? `github-run-${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_RUN_ATTEMPT}`
  : sanitizeTitle(new Date().toISOString());

export async function uploadImage(page, set, title, formula) {
  await page.addStyleTag({ content: "img { display: none !important; }" });
  const buffer = await page.screenshot({ fullPage: true });

  const formData = new FormData();
  formData.set("collection", set);
  formData.set("snapshot", sanitizeTitle(title));
  formData.set("formula", formula);
  formData.set("payload", new File([buffer], "screenshot.png", { type: "image/png" }));

  await fetch(`https://${process.env.URNERYS}/api/v1/projects/stories/builds/${build}/images`, {
    method: "POST",
    body: formData,
  });
}

export async function takeImage(page, title, set, url, viewport) {
  await page.setViewportSize(viewport);
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);
  await uploadImage(page, set, title, `w${viewport.width}`);
}
