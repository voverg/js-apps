import { storage } from '../core/utils.js';

const defaultState = {
  title: 'Новая таблица',
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  toolbarStyles: {},
  cellStyleList: {},
  defaultStyles: {
    'text-align': 'left',
    'font-weight': 'normal',
    'font-style': 'normal',
    'text-decoration': 'none',
  },
};

export const initialState = storage('sheets-state') || defaultState;