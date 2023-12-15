import { Page } from "../core/page.js";

export class DashboardPage extends Page {
  constructor($root) {
    super($root);
    this.setTitle('Дашборд');
  }

  render() {
    super.render(this.template());
  }

  template() {
    const template = `
      <h1>Dashboard page</h1>
      <a href="#dashboard">Dashboard</a>
      <a href="#table">Table</a>
    `;
    
    return template;
  }


}