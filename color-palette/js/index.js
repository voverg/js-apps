'use strict';

const $root = document.querySelector('.root');
const initialState = {
  colAmount: 5,
  hash: '',
  events: [],
  showHelp: false,
  showShareLink: false
}

const store = createStore(rootReducer, initialState);
const domListener = new DomListener();

const app = new App($root, {
  store,
  domListener,
});

app.init();
domListener.setEvents();

