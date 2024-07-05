import { test } from "@playwright/test";
import { takeImage } from "./shared";

for (const url of [
  "/where-i-was-meant-to-be",
  "/one-more-rush",
  "/dreamers-wake",
  "/blouson-noir",
  "/shivering-sense",
  "/no-end-in-sight",
  "/rebirth",
  "/where-the-roads-collide",
  "/kindest-regards",
  "/safe",
]) {
  test(url, async ({ page }, { title }) => {
    const viewports = [
      { width: 360, height: 640 },
      { width: 800, height: 600 },
      { width: 1400, height: 900 },
    ];

    for (const viewport of viewports) {
      await takeImage(page, title, "stories", url, viewport);
    }
  });
}
