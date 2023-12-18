export class Page {
  constructor($root, params) {
    this.$root = $root;
    this.params = params;
    this.title = '';
    this.page = null;
  }

  setTitle(title) {
    this.title = title;
    document.title = title;
  }

  getPage() {
    throw new Error(`The page ${this.title} needs to set getPage method`);
  }

  render() {
    const $page = this.getPage();
    this.$root.innerHTML = '';
    this.$root.append($page);
    
  }

  afterRender() {
    if (!this.page?.init) {
      throw new Error(`The page ${this.title} needs to set this.page.init in getPage method`);
    }

    this.page.init();
  }

  destroy() {
    if (!this.page?.destroy) {
      throw new Error(`The page ${this.title} needs to set this.page.destroy in getPage method`);
    }

    this.page.destroy();
  }

}