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
    },
  }
}


function rootReducer(state, action) {
  switch (action.type) {
    case 'tab':
      state = {...state, ...action.payload}
      return state;
  }
}