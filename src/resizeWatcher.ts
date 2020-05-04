import { getDefaultObserver } from './get-default-observer';
import { OnResize } from './types';

const isHTMLElement = (node: Element): node is HTMLElement =>
  node instanceof HTMLElement;

const createElementObserver = (node: Element, onResize: OnResize) => {
  if (isHTMLElement(node as Element)) {
    getDefaultObserver().observe(node, onResize);
  }

  return { unobserve: () => getDefaultObserver().unobserve(node) };
};

export default function resizeWatcher(
  nodeOrSelector: Element | string,
  onResize: OnResize
) {
  const node =
    typeof nodeOrSelector === 'string'
      ? document.querySelector(nodeOrSelector)
      : nodeOrSelector;
  // @ts-ignore
  return createElementObserver(node, onResize);
}
