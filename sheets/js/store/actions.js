import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_TITLE,
  CHANGE_CELL_STYLES,
} from './action-types.js';

/**
 * Create table resize action
 * @param  {{id: string, value: number}} data Receive row or column id and value (column width or row height)
 * @return {{type: string, data: data}}      Return resize table action
 */
export function tableResize(data) {
  return {type: TABLE_RESIZE, payload: data};
}

/**
 * Create change cell data action
 * @param  {{text: string, id: string}} data Get cell data
 * @return {{type: string, payload: data}}      Return changed cell data action
 */
export function changeText(data) {
  return {type: CHANGE_TEXT, payload: data};
}

/**
 * Create change title action
 * @param  {string} text Get title text
 * @return {{type: string, payload: string}}      [description]
 */
export function changeTitle(text) {
  return {type: CHANGE_TITLE, payload: text};
}

export function changeCellStyles(data) {
  return {type: CHANGE_CELL_STYLES, payload: data};
}
