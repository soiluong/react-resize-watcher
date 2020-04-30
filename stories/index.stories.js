import React from 'react';
import ResizeWatcher from '../src';

export default {
  title: 'Resize Watcher Demo'
};

const log = (props) => console.log(props);

export const ResizeWatcherDemo = () => (
  <div>
    <ResizeWatcher onResize={log}>
      <div style={{ width: '100%', height: '300px', background: 'red' }} />
    </ResizeWatcher>

    <ResizeWatcher onResize={log}>
      <div
        style={{
          width: '100%',
          maxWidth: '300px',
          height: '300px',
          background: 'blue'
        }}
      />
    </ResizeWatcher>

    <ResizeWatcher onResize={log}>
      <div
        style={{
          width: '100%',
          maxWidth: '150px',
          height: '300px',
          background: 'green'
        }}
      />
    </ResizeWatcher>
  </div>
);
