import { test } from "@playwright/test";
import { build, interceptImages, sanitizeTitle, uploadImage, waitForImages } from "./shared";

for (const url of ["/docs/components/Image", "/docs/components/Group", "/docs/components/Clip"]) {
  test(url, async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto(url);
    await page.waitForLoadState("networkidle");
    await waitForImages(page);

    const elements = await page.$$(".timvir-b-Exhibit");
    for (const [index, element] of elements.entries()) {
      await element.scrollIntoViewIfNeeded();

      const buffer = await (await element.$(".timvir-b-Exhibit-container"))?.screenshot();
      if (!buffer) {
        continue;
      }

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

for (const url of [
  "/docs/components/Group/samples/responsive",
  "/docs/components/Body/samples/layout",
  "/docs/components/Body/samples/text",
  "/docs/components/Body/samples/image",
  "/docs/components/Body/samples/group",
  "/docs/components/StoryCard/samples/regular",
  "/docs/components/StoryCard/samples/inverted",
]) {
  test(url, async ({ page }, { title }) => {
    await interceptImages(page);

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
      await page.goto(url);
      await page.waitForTimeout(2000);
      await waitForImages(page);

      const height = await page.evaluate(() => Math.ceil(document.body.clientHeight));
      await page.setViewportSize({ width: viewport.width, height });

      await uploadImage(
        page,
        `Components/${component}/Samples`,
        title.split("/").at(-1) ?? title,
        `w${viewport.width}`,
      );
    }
  });
}
