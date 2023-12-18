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
    // Create an initial page
    this.route();
    // If url hash canged call this.route function to create new page
    window.addEventListener('hashchange', this.route);
  }

  getUrlandParams() {
    // Get current url hash, create current url path and url params
    let url = location.hash.slice(1);
    let params = '';
    // Get params if exist
    if (url.includes('/')) {
      [url, params] = url.split('/');
    }

    return [url, params];
  }

  route() {
    // If any page exists then destroy exiting page to create new page
    if (this.page) {
      this.page.destroy();
    }

    const [url, params] = this.getUrlandParams();
    // Find a route with current url path
    const route = this.routes.find((route) => route.path === url);

    // Create a new page
    const Page = route ? route.page : this.notFound;
    this.page = new Page(this.$root, params);
    this.page.render();
    this.page.afterRender();
  }

}