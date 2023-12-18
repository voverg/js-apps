import { Page } from "../core/page.js";

export class DashboardPage extends Page {
  constructor($root, params) {
    super($root, params);
    this.setTitle('Дашборд');
  }

  getPage() {
    const template = `
      <h1>Dashboard page</h1>
      <a href="#dashboard">Dashboard</a>
      <a href="#table">Table</a>
    `;

    this.page = {
      init() {},
      destroy() {}
    };
    
    const $page = document.createElement('div');
    $page.innerHTML = template;

    return $page;
  }


}