import { Page } from "./page.js";

export class Router {
  constructor({ $root, routes, notFound }) {
    this.$root = $root;
    this.routes = routes;
    this.notFound = notFound;
    this.route = this.route.bind(this);
    this.page = null;

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.route);
    this.route();
  }

  route() {
    if (this.page) {
      this.page.destroy();
    }

    const pageHash = location.hash.slice(1);
    const pageObj = this.routes.find((route) => route.path === pageHash);
    const Page = pageObj ? pageObj.page : this.notFound;

    this.page = new Page(this.$root);
    this.page.render();
  }

}