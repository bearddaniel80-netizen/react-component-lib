/**
 * A simple event bus built on top of the browser's EventTarget API.
 *
 * Allows different parts of the application to communicate through
 * named events without needing direct references to each other.
 *
 * @class EventBus
 *
 * @example
 * const unsubscribe = eventBus.on("upload:progress", ({ index, progress }) => {
 *   console.log(`File ${index}: ${progress}%`);
 * });
 *
 * eventBus.emit("upload:progress", {
 *   index: 0,
 *   progress: 50
 * });
 *
 * unsubscribe();
 */
class EventBus extends EventTarget {

  /**
   * Emit an event with optional data.
   *
   * @param {string} event - Name of the event to emit.
   * @param {*} [detail] - Data to pass to event listeners.
   * @returns {void}
   *
   * @example
   * eventBus.emit("upload:start", {
   *   index: 0,
   *   file
   * });
   */
  emit(event, detail) {
    this.dispatchEvent(
      new CustomEvent(event, { detail })
    );
  }

  /**
   * Register a listener for an event.
   *
   * @param {string} event - Name of the event to listen for.
   * @param {Function} handler - Function called when the event is emitted.
   * @returns {Function} A cleanup function that removes the listener.
   *
   * @example
   * const unsubscribe = eventBus.on(
   *   "upload:progress",
   *   ({ index, progress }) => {
   *     console.log(index, progress);
   *   }
   * );
   *
   * // Later:
   * unsubscribe();
   */
  on(event, handler) {
    const listener = (e) => handler(e.detail);

    this.addEventListener(event, listener);

    // Return cleanup function
    return () => {
      this.removeEventListener(event, listener);
    };
  }

  /**
   * Remove an event listener.
   *
   * @param {string} event - Name of the event.
   * @param {Function} handler - Function that was registered as the listener.
   * @returns {void}
   */
  off(event, handler) {
    // Implementation goes here
  }
}

/**
 * Global application event bus.
 *
 * @type {EventBus}
 */
export const eventBus = new EventBus();