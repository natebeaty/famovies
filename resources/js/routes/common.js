import zenscroll from 'zenscroll';
import appState from '../shared/appState';

// JavaScript to be fired on all pages
const common = {
  init() {

    // Adjust aspect-ratio for "fitvid" videos
    document.querySelectorAll('iframe[src*="youtube"], iframe[src*="vimeo"]').forEach((video) => {
      video.style.aspectRatio = `${video.getAttribute('width')} / ${video.getAttribute('height')}`
    });
  },

  // Return object of all params for a URL
  getParams(url = window.location) {
    let params = {};
    new URL(url).searchParams.forEach(function (val, key) {
      if (params[key] !== undefined) {
        if (!Array.isArray(params[key])) {
          params[key] = [params[key]];
        }
        params[key].push(val);
      } else {
        params[key] = val;
      }
    });
    return params;
  },

  // Scroll to element without showing nav
  scrollElementIntoView(el, speed=750) {
    if (appState.isAnimating) return false;
    appState.isAnimating = true;
    zenscroll.to(el, speed, () => {
      setTimeout(() => {
        appState.isAnimating = false;
      }, speed-50);
    });
  },

  // Escape html string (js equivalent of htmlentities)
  escapeHtml(string) {
    return string
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  finalize() {},
  unload() {},
};

export default common;
