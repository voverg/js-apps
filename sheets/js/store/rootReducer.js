import {
  CHANGE_CELL_STYLES,
  CHANGE_TEXT,
  CHANGE_TITLE,
  SET_TOOLBAR_STYLES,
  TABLE_RESIZE,
} from './action-types.js';

export function rootReducer(state, {type, payload}) {
  switch (type) {
    case TABLE_RESIZE:
      const field = payload.typeResize === 'col' ? 'colState' : 'rowState';
      const newColState = {...state[field], [payload.id]: payload.value};
      return { ...state, [field]: newColState };
    case CHANGE_TEXT:
      const newDataState = {...state.dataState, [payload.id]: payload.text};
      return {...state, currentText: payload.text, dataState: newDataState};
    case CHANGE_TITLE:
      return {...state, title: payload};
    case CHANGE_CELL_STYLES:
      return {...state, cellStyles: payload};
    case SET_TOOLBAR_STYLES:
      return {...state, toolbarStyles: payload};
    default:
      return state;
  }

}