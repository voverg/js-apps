import { Sheet } from '../components/sheet/sheet.js';
import { Header } from '../components/header/header.js';
import { Toolbar } from '../components/toolbar/toolbar.js';
import { Formula } from '../components/formula/formula.js';
import { Table } from '../components/table/table.js';
import { Footer } from '../components/footer/footer.js';
import { Modal } from '../components/modal/modal.js';

import { Page } from "../core/page.js";
// import { Emitter } from '../core/emitter.js';
import { debounce, storage } from '../core/utils.js';
import { createStore } from '../core/createStore.js';
import { rootReducer } from '../store/rootReducer.js';
import { getInitialState } from '../store/initial-state.js';

export class TablePage extends Page {
  constructor($root, params) {
    super($root, params);
  }

  getPage() {
    const tableName = `table:${this.params}`;
    const initialState = getInitialState(tableName);
    const store = createStore(rootReducer, initialState);

    const stateListener = debounce((state) => {
      storage(tableName, state);
    }, 500);

    store.subscribe(stateListener);
    // Set page title
    this.setTitle(store.getState().title);

    this.page = new Sheet({
      components: [Header, Toolbar, Formula, Table, Footer, Modal],
      store,
    });

    return this.page.getRoot();
  }

}
