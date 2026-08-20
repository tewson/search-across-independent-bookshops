import type { Page } from "puppeteer";

export default async function companyOfBooks(page: Page, searchQuery: string) {
  await page.goto(
    `https://thecompanyofbooks.ie/store/search?keyword=${searchQuery}`,
  );

  try {
    // Wait for client-side rendering
    await page.waitForSelector(".page-title__name", { timeout: 10000 });

    const results = await page.$$eval(
      "a.grid-product__title",
      (productTitleLinks) => {
        return productTitleLinks
          .map((productTitleLink) => {
            const title =
              productTitleLink.querySelector(".grid-product__title-inner")
                ?.textContent ?? "";
            const href = productTitleLink.getAttribute("href") ?? "";
            return { title, href };
          })
          .filter((rawResult) => rawResult.title && rawResult.href)
          .slice(0, 10)
          .map((result) => ({
            title: result.title,
            href: `https://thecompanyofbooks.ie${result.href}`,
          }));
      },
    );

    return results;
  } catch {
    return [];
  }
}
