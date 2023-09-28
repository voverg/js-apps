'use strict';

function createStore(rootReducer, initialState) {
  let state = rootReducer(initialState, {type: '__init__'});
  const subscribers = [];

  return {
    dispatch(action) {
      state = rootReducer(state, action);
      subscribers.forEach(fn => fn());
    },

    subscribe(callback) {
      subscribers.push(callback);
    },

    getState() {
      return state;
    }
  };

}


function rootReducer(state, action) {
  switch (action.type) {
    case 'colAmount':
      return {...state, colAmount: action.payload};
    default:
      return state;
  }
}