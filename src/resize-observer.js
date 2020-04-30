// interface QueuedItem {
//   child: HTMLElement;
//   options: ResizeObserverObserveOptions;
// }

export default class ResizeObserverWrapper {
  observer;
  observedMap = new WeakMap();
  observedQueue = [];
  activeObservers = [];

  constructor() {
    if (typeof ResizeObserverWrapper === 'undefined') return;

    this.createObserver();
    this.flushQueue();
  }

  createObserver() {
    this.observer = new ResizeObserver(this.fireListeners);
  }

  fireListeners = (entries) => entries.forEach(this.fireListener);

  fireListener = (entry) => {
    const onResize = this.observedMap.get(entry.target);
    if (onResize) onResize(entry);
  };

  flushQueue() {
    if (!this.observer) return;

    this.observedQueue.forEach(({ child, onResize }) => {
      this.observedMap.set(child, onResize);
      this.observer.observe(child);
    });
  }

  observe = (child, onResize) => {
    this.observedQueue.push({ child, onResize });
    this.activeObservers.push(child);
    this.flushQueue();
  };

  unobserve = (child) => {
    this.observedMap.delete(child);
    this.observer.unobserve(child);
    this.activeObservers.splice(this.activeObservers.indexOf(child), 1);
  };
}
