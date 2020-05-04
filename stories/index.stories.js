import React, { useEffect } from 'react';
import { ResizeWatcherElement, resizeWatcher } from '../src';

export default {
  title: 'Resize Watcher Demo'
};

const log = (props) => console.log(props);

export const ResizeWatcherDemo = () => (
  <div>
    <ResizeWatcherElement onResize={log}>
      <div style={{ width: '100%', height: '300px', background: 'red' }} />
    </ResizeWatcherElement>

    <ResizeWatcherElement onResize={log}>
      <div
        style={{
          width: '100%',
          maxWidth: '300px',
          height: '300px',
          background: 'blue'
        }}
      />
    </ResizeWatcherElement>

    <ResizeWatcherElement onResize={log}>
      <div
        style={{
          width: '100%',
          maxWidth: '150px',
          height: '300px',
          background: 'green'
        }}
      />
    </ResizeWatcherElement>
  </div>
);

export const StaticResizeWatcherDemo = () => {
  useEffect(() => {
    const observedElement = resizeWatcher('.container', log);

    // unobserve element on unmount
    return observedElement.unobserve;
  });
  return (
    <div
      style={{ width: '100%', height: '300px', background: 'red' }}
      className="container"
    />
  );
};
