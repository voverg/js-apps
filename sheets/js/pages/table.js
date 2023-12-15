import { Page } from "../core/page.js";

export class TablePage extends Page {
  constructor($root) {
    super($root);
    this.setTitle('Таблица');
  }

  render() {
    super.render(this.template());
  }

  template() {
    const template = `
      <h1>Table page</h1>
      <a href="#">Dashboard</a>
      <a href="#table">Table</a>
    `;
    
    return template;
  }

}