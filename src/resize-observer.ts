interface QueuedItem {
  child: Element;
  onResize: OnResize;
}

export default class ResizeObserverWrapper {
  observer: ResizeObserver | undefined;
  observedMap: WeakMap<Element, OnResize> = new WeakMap();
  observedQueue: QueuedItem[] = [];
  activeObservers: Element[] = [];

  constructor() {
    if (typeof ResizeObserverWrapper === 'undefined') return;

    this.createObserver();
    this.flushQueue();
  }

  createObserver() {
    this.observer = new ResizeObserver(this.fireListeners);
  }

  fireListeners = (entries: ResizeObserverEntry[]) =>
    entries.forEach(this.fireListener);

  fireListener = (entry: ResizeObserverEntry) => {
    const onResize = this.observedMap.get(entry.target);
    if (onResize) onResize(entry);
  };

  flushQueue() {
    if (!this.observer) return;

    this.observedQueue.forEach(({ child, onResize }) => {
      this.observedMap.set(child, onResize);
      this.observer && this.observer.observe(child);
    });
  }

  observe = (child: Element, onResize: OnResize) => {
    this.observedQueue.push({ child, onResize });
    this.activeObservers.push(child);
    this.flushQueue();
  };

  unobserve = (child: Element) => {
    this.observedMap.delete(child);
    this.observer && this.observer.unobserve(child);
    this.activeObservers.splice(this.activeObservers.indexOf(child), 1);
  };
}
