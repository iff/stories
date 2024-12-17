import { expect, Page, PageScreenshotOptions } from "@playwright/test";
import sharp from "sharp";

export function sanitizeTitle(s: string): string {
  return s
    .replaceAll(/[\/:*\?"<>|\s]+/g, "-")
    .replace(/-+$/g, "")
    .replace(/^-/, "")
    .replace(/-$/, "")
    .toLowerCase();
}

export const build = process.env.GITHUB_RUN_ID
  ? `github-run-${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_RUN_ATTEMPT}`
  : sanitizeTitle(new Date().toISOString());

export async function uploadImage(page: Page, collection, title, formula, options?: PageScreenshotOptions) {
  const buffer = await page.screenshot(options);

  const formData = new FormData();
  formData.set("collection", collection);
  formData.set("snapshot", title);
  formData.set("formula", formula);
  formData.set("payload", new File([buffer], "screenshot.png", { type: "image/png" }));

  await fetch(`https://${process.env.URNERYS}/api/v1/projects/stories/builds/${build}/images`, {
    method: "POST",
    body: formData,
  });
}

export async function waitForImages(page: Page): Promise<void> {
  await page.waitForLoadState("networkidle");

  for (const img of await page.locator("img").all()) {
    const isVisible = await img.evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    });
    if (isVisible) {
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/complete
      await expect(img).toHaveJSProperty("complete", true);

      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalWidth
      await expect(img).not.toHaveJSProperty("naturalWidth", 0);
    }
  }
}

export async function interceptImages(page: Page) {
  /*
   * Transform all images to be entirely black to avoid spurious snapshot
   * diffs due to image rendering artifacts.
   *
   * We merely fill the image (with black), while keeping its original
   * dimensions. This ensures that the layout of the page remains as
   * intended.
   */
  await page.route("**/*", async (route) => {
    const response = await route.fetch();
    if (response.headers()["content-type"]?.startsWith("image/")) {
      const body = await response.body();

      const transformer = sharp(body);
      transformer.composite([
        {
          input: { create: { width: 1, height: 1, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } } },
          tile: true,
        },
      ]);
      transformer.png({});

      await route.fulfill({
        response,
        headers: { "content-type": "image/png" },
        body: await transformer.toBuffer(),
      });
    } else {
      await route.fulfill({ response });
    }
  });
}

export async function takeImage(page: Page, title, collection, url, viewports) {
  await interceptImages(page);

  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("img");

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(50);
    await waitForImages(page);
    await uploadImage(page, collection, title, `w${viewport.width}`);
  }
}
