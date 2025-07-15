import { expect, Page, PageScreenshotOptions } from "@playwright/test";

function sanitizeTitle(s: string): string {
  return s
    .replaceAll(/[/:*?"<>|\s]+/g, "-")
    .replace(/-+$/g, "")
    .replace(/^-/, "")
    .replace(/-$/, "")
    .toLowerCase();
}

const build = process.env.BUILDID ?? sanitizeTitle(new Date().toISOString());

export async function uploadImage(
  page: Page,
  collection: string,
  title: string,
  formula: string,
  options?: PageScreenshotOptions,
) {
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
  /*
   * Force all images (even those outside of the viewport) to be decoded
   * synchronously and loaded eagerly.
   */
  await page.evaluate(() => {
    Array.from(document.images).every((img) => {
      if (img.decoding !== "sync") {
        img.decoding = "sync";
      }

      if (img.loading !== "eager") {
        img.loading = "eager";
      }
    });
  });

  for (const img of await page.locator("img").all()) {
    const isVisible = await img.evaluate((node) => {
      const rect = node.getBoundingClientRect();

      if (rect.width === 0 && rect.height === 0) {
        return false;
      }

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

  /*
   * Add a small delay to allow the GPU or compositor to finish processing
   * the page and fully render all the images.
   */
  await page.waitForTimeout(50);
}
