import type { Page } from "puppeteer";

export default async function bookUpstairs(page: Page, searchQuery: string) {
  await page.goto(`https://booksupstairs.ie/?s=${searchQuery}`);

  const productTitleElement = await page.$(
    ".book_row_container .book_row_details_container .h5",
  );

  const productTitle =
    (await productTitleElement?.evaluate((el) => el.textContent)) ?? "";

  const productLinkElement = await page.$(".book_row_container a");

  const productLinkHref =
    (await productLinkElement?.evaluate(
      (el) => el.attributes.getNamedItem("href")?.value,
    )) ?? "";

  return {
    title: productTitle,
    href: productLinkHref,
  };
}
