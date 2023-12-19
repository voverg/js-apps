import { Page } from "../core/page.js";
import { Dashboard } from '../components/dashboard/dashboard.js';

export class DashboardPage extends Page {
  constructor($root, params) {
    super($root, params);
    this.setTitle('Дашборд');
  }

  getPage() {
    this.page = new Dashboard();

    return this.page.getRoot();
  }


}