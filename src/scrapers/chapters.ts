import type { Page } from "puppeteer";

export default async function chapters(page: Page, searchQuery: string) {
  await page.goto(`https://chaptersbookstore.com/search?q=${searchQuery}`);

  await page.locator("#shopify-pc__banner__btn-decline").click();

  const results = await page.$$eval("h3.product-title", (productTitles) => {
    return productTitles
      .map((productTitleElement) => {
        const title = productTitleElement.textContent;
        const href =
          productTitleElement.querySelector("a")?.getAttribute("href") ?? "";
        return { title, href };
      })
      .filter((rawResult) => rawResult.title && rawResult.href)
      .slice(0, 10)
      .map((result) => ({
        title: result.title,
        href: `https://chaptersbookstore.com${result.href}`,
      }));
  });

  return results;
}
