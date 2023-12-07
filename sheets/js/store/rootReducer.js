import { CHANGE_TEXT, TABLE_RESIZE } from './action-types.js';

export function rootReducer(state, {type, payload}) {
  switch (type) {
    case TABLE_RESIZE:
      const field = payload.typeResize === 'col' ? 'colState' : 'rowState';
      const newColState = {...state[field], [payload.id]: payload.value};
      return { ...state, [field]: newColState };
    case CHANGE_TEXT:
      const newDataState = {...state.dataState, [payload.id]: payload.text};
      return {...state, currentText: payload.text, dataState: newDataState};
    default:
      return state;
  }

}