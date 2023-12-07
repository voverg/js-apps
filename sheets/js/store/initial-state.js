import { storage } from '../core/utils.js';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {}, // {id: '0:1', text: 'text example'}
  currentText: '',
};

export const initialState = storage('sheets-state') || defaultState;