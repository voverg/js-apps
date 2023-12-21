import { Page } from "../core/page.js";

import { Dashboard } from '../components/dashboard/dashboard.js';
import { DbHeader } from '../components/dashboard/db-header.js';
import { DbTable } from '../components/dashboard/db-table.js';
import { Footer } from '../components/footer/footer.js';

export class DashboardPage extends Page {
  constructor($root, params) {
    super($root, params);
    this.setTitle('Дашборд');
  }

  getPage() {
    this.page = new Dashboard({
      components: [DbHeader, DbTable, Footer],
    });

    return this.page.getRoot();
  }


}