import type { Page } from "puppeteer";

export default async function bookUpstairs(page: Page, searchQuery: string) {
  await page.goto(`https://booksupstairs.ie/?s=${searchQuery}`);

  const results = await page.$$eval(
    ".book_row_container",
    (bookRowContainers) => {
      return bookRowContainers
        .map((bookRowContainer) => {
          const title =
            bookRowContainer.querySelector(".book_row_details_container .h5")
              ?.textContent ?? "";
          const href =
            bookRowContainer.querySelector("a")?.getAttribute("href") ?? "";
          return { title, href };
        })
        .filter((rawResult) => rawResult.title && rawResult.href)
        .slice(0, 10);
    },
  );

  return results;
}
