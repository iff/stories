import { test } from "@playwright/test";
import { uploadImage, waitForImages } from "./shared";

const viewports = [
  ["mobile", { width: 390, height: 850 }],
  ["desktop", { width: 1400, height: 900 }],
] as const;

for (const [label, viewport] of viewports) {
  test(label, async ({ page }) => {
    await page.addStyleTag({ content: "img { display: none !important; }" });

    await page.setViewportSize(viewport);

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("img");
    await page.waitForTimeout(50);
    await waitForImages(page);
    await uploadImage(page, "Visual Smoke Test", "Home Page", label);

    await page.goto("/where-i-was-meant-to-be", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("img");
    await page.waitForTimeout(50);
    await waitForImages(page);
    await uploadImage(page, "Visual Smoke Test", "Story Page", label);

    await page.goto("/where-i-was-meant-to-be/7B9iipbSXhZ5iYuNafApU8MZj5CfbWEkWfHm7KViJgr2", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForSelector("img");
    await page.waitForTimeout(50);
    await waitForImages(page);
    await uploadImage(page, "Visual Smoke Test", "Image Detail Page", label);
  });
}
