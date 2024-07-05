import { test } from "@playwright/test";
import { takeImage } from "./shared";

test("home", async ({ page }, { title }) => {
  const viewports = [
    { width: 360, height: 640 },
    { width: 800, height: 600 },
    { width: 1400, height: 900 },
  ];

  for (const viewport of viewports) {
    await takeImage(page, title, "pages", "/", viewport);
  }
});
