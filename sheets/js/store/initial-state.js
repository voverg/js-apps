import { storage, cloneObject } from '../core/utils.js';

const defaultState = {
  title: 'Новая таблица',
  colState: {},
  rowState: {},
  rowCount: 10,
  dataState: {},
  visibleDataState: {},
  currentText: '',
  toolbarStyles: {},
  cellStyleList: {},
  openedDate: new Date().toJSON(),
  defaultStyles: {
    'justify-content': 'start',
    'align-items': 'start',
    'font-weight': 'normal',
    'font-style': 'normal',
    'text-decoration': 'none',
    'background-color': '#ffffff',
    'color': '#000000',
    'box-shadow': 'none',
  },
};

export function getInitialState(tableName) {
  return storage(tableName) || cloneObject(defaultState);
}
