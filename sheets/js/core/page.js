export class Page {
  constructor($root) {
    this.$root = $root;
  }

  setTitle(title) {
    document.title = title;
  }

  template() {
    return 'Default template';
  }

  render(template) {
    const $page = document.createElement('div');
    $page.innerHTML = template;

    this.$root.innerHTML = '';
    this.$root.append($page);
  }

  destroy() {}

}