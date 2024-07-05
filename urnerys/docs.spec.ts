import { test } from "@playwright/test";
import { takeImage, uploadImage } from "./shared";

for (const url of [
  "/docs/components/Image",
  "/docs/components/Content",
  "/docs/components/Group",
  "/docs/components/Clip",
]) {
  test(url, async ({ page }, { title }) => {
    const viewports = [
      { width: 360, height: 640 },
      { width: 1400, height: 900 },
    ];

    for (const viewport of viewports) {
      await takeImage(page, title, "docs", url, viewport);
    }
  });
}

for (const url of ["/docs/components/Content/samples/basic", "/docs/components/Group/samples/responsive"]) {
  test(url, async ({ page }, { title }) => {
    const viewports = [
      { width: 360, height: 640 },
      { width: 550, height: 600 },
      { width: 800, height: 600 },
      { width: 1400, height: 900 },
      { width: 1800, height: 900 },
    ];

    for (const viewport of viewports) {
      await takeImage(page, title, "docs/samples", url, viewport);
    }
  });
}
