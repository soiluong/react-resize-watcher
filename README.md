# React Resize Watcher

**React Resize Watcher** provides a simple interface to the [Resize Observer API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

It provides two ways to handle element resizes: `ResizeWatcherElement` and `resizeWatcher`.

- **`ResizeWatcherElement`** adds its direct DOM child as the observed element.
- **`resizeWatcher`** enables you to specify a target reference to be observed

**Highlights**

- **Unopinionated** and provides the full [`ResizeObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry)
- **SSR** ready
- Does not interfere with **refs**
- Does not use `ReactDOM.findDOMNode`

## Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Browser support](#browser_support)

# Install

```
npm i react-resize-watcher
# or
yarn add react-resize-watcher
```

# Usage
**1. Use in render method**

Wrapping a component with `ResizeWatcherElement` will subscribe its first child DOM element to a `Resize Observer`.
Upon element resize the `onResize` handler will fire.

```javascript
const log = ({ contentRect, target }) => console.log({ contentRect, target });

const Demo = () => (
  <ResizeWatcherElement onResize={log}>
    <div
      style={{
        width: '100%',
        height: '300px'
      }}
    />
  </ResizeWatcherElement>
);
```

**2. Use statically**

We can observe any element in a function, if required.

```javascript
const log = ({ contentRect, target }) => console.log({ contentRect, target });

const Demo = () => {
  React.useEffect(() => {
    // can observe a rendered element
    const observedElement = resizeWatcher('.container', log);

    // or you can observe the document.body
    const bodyElement = resizeWatcher('body', log);

    // unobserve element on unmount
    return observedElement;
  });
  return (
    <div
      style={{ width: '100%', height: '300px', background: 'red' }}
      className="container"
    />
  );
};
```

## API

### `ResizeWatcherElement`

Observe an element for changes to its size

**Props**

**`onResize: (e: ResizeObserverEntry) => any`**

onResize function that will be invoked with `ResizeObserverEntry`.

### `resizeWatcher (nodeOrSelector, onResize) => ResizeObserver.unobserve(node)`

**Accepts two parameters**

`nodeOrSelector: Element | string` and `onResize: Function`

nodeOrSelector: a selector or DOM element to observe.

onResize function that will be invoked with `ResizeObserverEntry`.

`resizeWatcher() => ResizeObserver.unobserve(node)`

resizeWatcher returns the `unobserve()` method that ends the observing of the specified node.

## Browser support

React Resize Watcher is dependent on the `ResizeObserver` API and `WeakMap`:

### Resize Observer API

[Browser support](https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API#Browser_compatibility) | [Polyfill](https://www.npmjs.com/package/resize-observer-polyfill)

### WeakMap

[Browser support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap#Browser_compatibility) | [Polyfill](https://www.npmjs.com/package/weakmap-polyfill)