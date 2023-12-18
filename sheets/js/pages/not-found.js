import { Page } from "../core/page.js";

export class NotFoundPage extends Page {
  constructor($root, params) {
    super($root, params);
    this.setTitle('Страница не найдена');
  }

  getPage() {
    const template = 'Страница не найдена';

    this.page = {
      init() {},
      destroy() {}
    };
    
    const $page = document.createElement('div');
    $page.innerHTML = template;

    return $page;
  }

}