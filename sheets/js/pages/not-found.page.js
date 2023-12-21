import { Page } from "../core/page.js";

export class NotFoundPage extends Page {
  constructor($root, params) {
    super($root, params);
    this.setTitle('Страница не найдена');
  }

  getPage() {
    this.page = {
      init() {},
      destroy() {}
    };
    
    const $page = document.createElement('div');
    $page.innerHTML = this.template();

    return $page;
  }

  template() {
    return `
      <div class="not-found">
        <h2 class="not-found__title">Страница не найдена</h2>
        <a href="#dashboard" class="not-found__link">Вернуться на главную страницу<a>
      </div>
    `;
  }

}