import ResizeObserverWrapper from './resize-observer';

let defaultObserver: ResizeObserverWrapper;

export const getDefaultObserver = () => {
  if (!defaultObserver) {
    defaultObserver = new ResizeObserverWrapper();
  }
  return defaultObserver;
};