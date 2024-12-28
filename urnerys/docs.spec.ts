import { test } from "@playwright/test";
import { build, sanitizeTitle, uploadImage } from "./shared";

for (const url of ["/docs/components/Image", "/docs/components/Group", "/docs/components/Clip"]) {
  test(url, async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);

    const elements = await page.$$(".timvir-b-Exhibit");
    for (const [index, element] of elements.entries()) {
      await element.scrollIntoViewIfNeeded();

      const buffer = await (await element.$(".timvir-b-Exhibit-container"))!.screenshot();

      const childElement = await element.$(".timvir-b-Exhibit-caption");
      const innerText = `${(await childElement?.innerText()) ?? index}`;

      const formData = new FormData();
      formData.set("collection", `Components/${url.split("/").at(-1)}/Exhibits`);
      formData.set("snapshot", sanitizeTitle(innerText));
      formData.set("formula", "none");
      formData.set("payload", new File([buffer], "screenshot.png", { type: "image/png" }));

      await fetch(`https://${process.env.URNERYS}/api/v1/projects/stories/builds/${build}/images`, {
        method: "POST",
        body: formData,
      });
    }
  });
}

for (const url of ["/docs/components/Content/samples/basic", "/docs/components/Group/samples/responsive"]) {
  test(url, async ({ page }, { title }) => {
    const component = url.split("/").at(3);

    const viewports = [
      { width: 360, height: 640 },
      { width: 550, height: 600 },
      { width: 800, height: 600 },
      { width: 1400, height: 900 },
      { width: 1800, height: 900 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(2000);

      const height = await page.evaluate(() => Math.ceil(document.body.clientHeight));
      await page.setViewportSize({ width: viewport.width, height });

      await uploadImage(page, `Components/${component}/Samples`, title.split("/").at(-1), `w${viewport.width}`);
    }
  });
}
