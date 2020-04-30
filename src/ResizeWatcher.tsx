import React, { Component } from 'react';

import ResizeObserverWrapper from './resize-observer';

let defaultObserver: ResizeObserverWrapper;

const getDefaultObserver = () => {
  if (!defaultObserver) {
    defaultObserver = new ResizeObserverWrapper();
  }
  return defaultObserver;
};

export default class ResizeWatcher extends Component {
  componentDidMount() {
    if (this.node && this.node instanceof HTMLElement) {
      this.observe = getDefaultObserver().observe;
      this.unobserve = getDefaultObserver().unobserve;

      this.observe(this.node, this.handleOnResize);
    }
  }

  componentWillUnmount() {
    if (this.node) {
      this.unobserve(this.node);
      delete this.node;
    }
  }

  node: Element | undefined;
  observe: ((node: Element, onResize: OnResize) => any) | undefined;
  unobserve: ((node: Element) => any) | undefined;

  handleOnResize = (entry: ResizeObserverEntry) => this.props.onResize(entry);

  render() {
    return React.Children.only(
      React.cloneElement(this.props.children, {
        ref: (node) => {
          this.node = node;
          const { ref } = this.props.children;

          if (typeof ref === 'function') {
            ref(node);
          } else if (ref !== null) {
            ref.current = node;
          }
        }
      })
    );
  }
}
