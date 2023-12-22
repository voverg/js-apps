import { storage, cloneObject } from '../core/utils.js';

const defaultState = {
  title: 'Новая таблица',
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  toolbarStyles: {},
  cellStyleList: {},
  openedDate: new Date().toJSON(),
  defaultStyles: {
    'text-align': 'left',
    'font-weight': 'normal',
    'font-style': 'normal',
    'text-decoration': 'none',
    'background-color': '#ffffff',
    'color': '#000000',
  },
};

export function getInitialState(tableName) {
  return storage(tableName) || cloneObject(defaultState);
}