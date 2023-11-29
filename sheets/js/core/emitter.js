export class Emitter {
  constructor() {
    this.listeners = {};
  }

  emit(event, ...args) {
    if ( !Array.isArray(this.listeners[event]) ) {
      return false;
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });

    return true;
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);

    return () => {
      this.listeners[event] = this.listeners[event].filter((listener) => listener !== fn);
    };
  }

}

// Tests
// const emitter = new Emitter();
// const unsub = emitter.subscribe('zhopa', (...data) => {
//   console.log('Data is:', ...data);
// });

// emitter.emit('zhopa', 789);
// emitter.emit('zhopa', 45, 16, 'first zhopa');
// emitter.emit('cat', 'cat');

// setTimeout(() => {
//   emitter.emit('zhopa', 'After 2 second');
// }, 2000);

// setTimeout(() => {
//   unsub();
// }, 3000);

// setTimeout(() => {
//   emitter.emit('zhopa', 'After 4 second');
// }, 4000);