import React, { Component } from 'react';
import { OnResize } from './types';
import { getDefaultObserver } from './get-default-observer';

type Props = {
  children: React.ReactNode;
  onResize: Function;
};

export default class ResizeWatcherElement extends Component<Props> {
  componentDidMount() {
    if (this.node && this.node instanceof HTMLElement) {
      this.observe = getDefaultObserver().observe;
      this.unobserve = getDefaultObserver().unobserve;

      this.observe(this.node, this.handleOnResize);
    }
  }

  componentWillUnmount() {
    if (this.node) {
      this.unobserve && this.unobserve(this.node);
      delete this.node;
    }
  }

  node: Element | undefined;
  observe: ((node: Element, onResize: OnResize) => any) | undefined;
  unobserve: ((node: Element) => any) | undefined;

  handleOnResize = (entry: ResizeObserverEntry) => this.props.onResize(entry);

  render() {
    return React.Children.only(
      React.cloneElement(this.props.children as React.ReactElement<any>, {
        ref: (node: Element) => {
          this.node = node;
          // @ts-ignore
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
