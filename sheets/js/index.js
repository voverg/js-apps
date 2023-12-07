import { Sheet } from './components/sheet/sheet.js';
import { Header } from './components/header/header.js';
import { Toolbar } from './components/toolbar/toolbar.js';
import { Formula } from './components/formula/formula.js';
import { Table } from './components/table/table.js';
import { Footer } from './components/footer/footer.js';

import { storage } from './core/utils.js';
import { createStore } from './core/createStore.js';
import { rootReducer } from './store/rootReducer.js';
import { initialState } from './store/initial-state.js';


const store = createStore(rootReducer, initialState);

store.subscribe((state) => {
  storage('sheets-state', state);
  console.log('App state:', state);
});

const sheet = new Sheet('#app', {
  components: [Header, Toolbar, Formula, Table, Footer],
  store,
});

sheet.render();