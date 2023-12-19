import { Router } from "./core/router.js";
import { DashboardPage } from "./pages/dashboard.page.js";
import { NotFoundPage } from "./pages/not-found.page.js";
import { TablePage } from "./pages/table.page.js";

export class App {
  routes = [
    { path: '', page: DashboardPage },
    { path: 'dashboard', page: DashboardPage },
    { path: 'table', page: TablePage },
  ];

  constructor($root) {
    this.$root = $root;

    this.init();
  }

  init() {
    new Router({
      $root: this.$root,
      routes: this.routes,
      notFound: NotFoundPage,
    });
  }

}