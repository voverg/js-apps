import { Sheet } from './components/sheet/sheet.js';
import { Header } from './components/header/header.js';
import { Toolbar } from './components/toolbar/toolbar.js';
import { Formula } from './components/formula/formula.js';
import { Table } from './components/table/table.js';
import { Footer } from './components/footer/footer.js';

const sheet = new Sheet('#app', {
  components: [Header, Toolbar, Formula, Table, Footer],
});

sheet.render();