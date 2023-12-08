import { storage } from '../core/utils.js';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  title: 'Новая таблица',
};

export const initialState = storage('sheets-state') || defaultState;