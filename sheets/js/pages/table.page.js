import { Sheet } from '../components/sheet/sheet.js';
import { Header } from '../components/header/header.js';
import { Toolbar } from '../components/toolbar/toolbar.js';
import { Formula } from '../components/formula/formula.js';
import { Table } from '../components/table/table.js';
import { Footer } from '../components/footer/footer.js';

import { Page } from "../core/page.js";
import { debounce, storage } from '../core/utils.js';
import { createStore } from '../core/createStore.js';
import { rootReducer } from '../store/rootReducer.js';
import { initialState } from '../store/initial-state.js';

export class TablePage extends Page {
  constructor($root, params) {
    super($root, params);
    this.setTitle('Таблица');
  }

  getPage() {
    const store = createStore(rootReducer, initialState);

    const stateListener = debounce((state) => {
      storage('sheets-state', state);
      console.log('App state:', state);
    }, 500);

    store.subscribe(stateListener);

    this.page = new Sheet({
      components: [Header, Toolbar, Formula, Table, Footer],
      store,
    });

    return this.page.getRoot();
  }

}