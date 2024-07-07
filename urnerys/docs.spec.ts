import { test } from "@playwright/test";
import { build, sanitizeTitle, takeImage, uploadImage } from "./shared";

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

    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);

    const elements = await page.$$(".r1nql2f9");
    for (const [index, element] of elements.entries()) {
      const buffer = await element.screenshot();

      const childElement = await element.$(".cf43jjx");
      const innerText = (await childElement?.innerText()) ?? `${index}`;

      const formData = new FormData();
      formData.set("project", "stories");
      formData.set("build", build);
      formData.set("set", "docs/exhibits");
      formData.set("snapshot", sanitizeTitle(innerText));
      formData.set("formula", "none");
      formData.set("payload", new File([buffer], "screenshot.png", { type: "image/png" }));

      await fetch(`https://${process.env.URNERYS}/rpc/uploadImage`, {
        method: "POST",
        body: formData,
      });
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
