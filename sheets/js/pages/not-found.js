import { Page } from "../core/page.js";

export class NotFoundPage extends Page {
  constructor($root) {
    super($root);
    this.setTitle('Страница не найдена');
  }

  render() {
    super.render(this.template());
  }

  template() {
    const template = 'Страница не найдена';
    
    return template;
  }

}