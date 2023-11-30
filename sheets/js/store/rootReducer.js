export function rootReducer(state, action) {
  switch (action.type) {
    case 'TABLE_RESIZE':
      return { ...state, colState: {...state.colState, ...action.data}};
    default:
      return state;
  }
}