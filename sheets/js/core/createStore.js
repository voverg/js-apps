export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer(initialState, {type: '__INIT__'});
  let subscribers = [];

  return {
    dispatch(action) {
      state = rootReducer(state, action);
      subscribers.forEach((fn) => fn(state));
    },
    subscribe(fn) {
      subscribers.push(fn);
      return {
        unsubscribe() {
          subscribers = subscribers.filter((subscriber) => subscriber !== fn);
        }
      };
    },
    getState() {
      return state;
    }
  };
}