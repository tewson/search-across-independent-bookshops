import type { Page } from "puppeteer";

export default async function companyOfBooks(page: Page, searchQuery: string) {
  await page.goto(
    `https://thecompanyofbooks.ie/store/search?keyword=${searchQuery}`,
  );

  try {
    // Wait for client-side rendering
    await page.waitForSelector(".page-title__name", { timeout: 5000 });

    const productTitleElement = await page.$(".grid-product__title-inner");

    const productTitle =
      (await productTitleElement?.evaluate((el) => el.textContent)) ?? "";

    const productLinkElement = await page.$("a.grid-product__title");

    const productLinkHref =
      (await productLinkElement?.evaluate(
        (el) => el.attributes.getNamedItem("href")?.value,
      )) ?? "";

    if (!productTitle || !productLinkHref) {
      return undefined;
    }

    return {
      title: productTitle,
      href: productLinkHref,
    };
  } catch {
    return undefined;
  }
}
