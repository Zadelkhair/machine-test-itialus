export default class Pagination<T> {

  enabled: Boolean = true;
  dataPerPage: number = 15;
  count: number = -1;
  pages: number[] = [];
  currentPage: number = -1;
  nextPage: number = -1;
  prevPage: number = -1;
  data: T[] = [];
  private _data: T[] = [];

  constructor(data: T[], dataPerPage: number, currentPage: number = 0) {
    this._data = data;

    this.count = this._data.length;
    this.dataPerPage = dataPerPage;

    let pages = Math.floor(this.count / this.dataPerPage);

    if (this.dataPerPage % this.count > 0) {
      pages++;
    }

    this.pages = [];
    for (let i = 1; i <= pages; i++) {
      this.pages.push(i);
    }

    this.goToPage(currentPage);

  }

  goToPage(p: number) {
    if (p > 0 && p <= this.pages.length) {
      this.currentPage = p;
    }
    else {
      this.currentPage = 1;
    }

    if (this.currentPage < this.pages.length) {
      this.nextPage = this.currentPage + 1;
    }

    if (this.currentPage > 1) {
      this.prevPage = this.currentPage - 1;
    }

    this.loadData();
  }

  loadData() {
    let firstItem = 0;
    firstItem = (this.currentPage - 1) * this.dataPerPage;
    this.data = this._data.filter((v, i) => i >= firstItem && i - this.dataPerPage < firstItem);
  }

  goToItemPage(item?: T) {
    if (item)
      this.goToPage(Math.floor((this._data.indexOf(item))/this.dataPerPage)+1);
  }

}
