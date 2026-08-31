// The app switches layouts at 912/913px. jsdom has a fixed 1024px window, so
// tests that need the mobile tree set the width explicitly before rendering.
export const DESKTOP_WIDTH = 1024;
export const MOBILE_WIDTH = 375;

export function setViewportWidth(width) {
  window.innerWidth = width;
}

export function resetViewportWidth() {
  window.innerWidth = DESKTOP_WIDTH;
}
