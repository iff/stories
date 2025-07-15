import { expect, Page } from "@playwright/test";
import sharp from "sharp";

export function sanitizeTitle(s: string): string {
  return s
    .replaceAll(/[/:*?"<>|\s.()]+/g, "-")
    .replace(/-+$/g, "")
    .replace(/^-/, "")
    .replace(/-$/, "")
    .toLowerCase()
    .trim();
}

export const build = process.env.BUILDID ?? sanitizeTitle(new Date().toISOString());

export async function uploadImage(page: Page, set: string, title: string, formula: string) {
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
          input: {
            create: {
              width: 1,
              height: 1,
              channels: 4,
              background: { r: 100, g: 100, b: 120, alpha: 1 },
            },
          },
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
