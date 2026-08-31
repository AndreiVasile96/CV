// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// jsdom ships a `matchMedia` that always reports `matches: false`. Because every
// section of this app is wrapped in <MediaQuery>, that made components render an
// almost empty tree under test - which is why the a11y suites used to pass while
// checking nothing. Evaluate min-width/max-width against window.innerWidth
// instead; jsdom defaults to 1024px, i.e. the desktop breakpoint.
const evaluate = (query) => {
  const width = window.innerWidth;
  const min = /min-width:\s*(\d+)px/.exec(query);
  const max = /max-width:\s*(\d+)px/.exec(query);

  if (min && width < Number(min[1])) return false;
  if (max && width > Number(max[1])) return false;
  return true;
};

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: evaluate(query),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  })
});

// jsdom does not implement IntersectionObserver, which react-intersection-observer
// needs in order to drive the scroll-spy in App.js. Nothing scrolls under test,
// so a stub that never reports an intersection is enough.
/* eslint-disable class-methods-use-this */
class IntersectionObserverStub {
  constructor(callback) {
    this.callback = callback;
  }

  observe() {}

  unobserve() {}

  disconnect() {}

  takeRecords() {
    return [];
  }
}
/* eslint-enable class-methods-use-this */

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: IntersectionObserverStub
});
global.IntersectionObserver = IntersectionObserverStub;
