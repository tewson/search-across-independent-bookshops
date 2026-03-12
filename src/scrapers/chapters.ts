import type { Page } from "puppeteer";

export default async function chapters(page: Page, searchQuery: string) {
  await page.goto(`https://chaptersbookstore.com/search?q=${searchQuery}`);

  await page.locator("#shopify-pc__banner__btn-decline").click();

  await page.waitForSelector("h3.product-title");

  const productTitleElement = await page.$("h3.product-title");

  const productTitle =
    (await productTitleElement?.evaluate((el) => el.textContent)) ?? "";

  const productLinkElement = await page.$("h3.product-title a");

  const productLinkHref =
    (await productLinkElement?.evaluate(
      (el) => el.attributes.getNamedItem("href")?.value,
    )) ?? "";

  return {
    title: productTitle,
    href: productLinkHref,
  };
}
