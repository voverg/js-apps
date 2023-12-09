import { storage } from '../core/utils.js';

const defaultState = {
  title: 'Новая таблица',
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  cellStyles: {},
  toolbarStyles: {},
};

export const initialState = storage('sheets-state') || defaultState;