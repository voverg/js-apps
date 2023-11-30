import { Sheet } from './components/sheet/sheet.js';
import { Header } from './components/header/header.js';
import { Toolbar } from './components/toolbar/toolbar.js';
import { Formula } from './components/formula/formula.js';
import { Table } from './components/table/table.js';
import { Footer } from './components/footer/footer.js';

import { createStore } from './core/createStore.js';
import { rootReducer } from './store/rootReducer.js';
import { storage } from './core/utils.js';

const initialState = {
  colState: storage('sheets-state'),
};

const store = createStore(rootReducer, initialState);

store.subscribe((state) => {
  console.log('App state', state);
  storage('sheets-state', state);
});

const sheet = new Sheet('#app', {
  components: [Header, Toolbar, Formula, Table, Footer],
  store,
});

sheet.render();