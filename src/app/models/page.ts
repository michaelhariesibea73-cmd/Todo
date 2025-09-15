export class Page {
  page: number;
  size: number | string;
  total: number;
  pages: number;

  constructor(page: number = 1, size: number = 5, total: number = -1, pages: number = -1) {
    this.page = page;
    this.size = size;
    this.total = total;
    this.pages = pages;
  }
}
