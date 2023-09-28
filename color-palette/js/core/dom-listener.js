'use strict';

class DomListener {
  constructor() {
    this.events = {};
  }

  addEvents(events) {
    const idList = Object.keys(events);

    idList.forEach(id => {
      const listeners = Object.keys(events[id]);

      listeners.forEach(listener => {
        const fn = events[id][listener];
        // Add event to this.events obj
        if (listener in this.events) {
          this.events[listener].push({[id]: fn})
        } else {
          this.events[listener] = [{[id]: fn}];
        }
      });
      // console.log(this.events);
    });

  }

  setEvents() {
    const eventKeys = Object.keys(this.events);

    eventKeys.forEach(key => {
      // console.log(key);
      document.addEventListener(key, (event) => {
        const target = event.target;
        this.events[key].forEach(domListenerEvent => {
          if (target.id && (target.id in domListenerEvent)) {
            domListenerEvent[target.id]();
          }
        });
      });
    });
  }

}