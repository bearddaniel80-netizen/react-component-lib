// eventBus.js

class EventBus extends EventTarget {
  emit(event, detail) {
    this.dispatchEvent(new CustomEvent(event, { detail }));
  }

  on(event, handler) {
    const listener = (e) => handler(e.detail);

    this.addEventListener(event, listener);
  }
  off(event,handler){
    // Return unsubscribe function
    const listener = (e) => handler(e.detail);
    return () => {
      this.removeEventListener(event, listener);
    };
  }
}

export const eventBus = new EventBus();