import {
  CHANGE_CELL_STYLES,
  CHANGE_TEXT,
  CHANGE_TITLE,
  TABLE_RESIZE,
  UPDATE_DATE,
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
      let cellStyles = {};
      
      payload.id.forEach((id) => {
        cellStyles[id] = payload.styles;
      });

      const newStyleList = {...state.cellStyleList, ...cellStyles};
      return {...state, cellStyleList: newStyleList};
    case UPDATE_DATE:
      return {...state, openedDate: new Date().toJSON()};
    default:
      return state;
  }

}