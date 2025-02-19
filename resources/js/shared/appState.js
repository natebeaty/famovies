// Shared app state

const appState = {
  isAnimating: false,
  navStuck: false,
  storageData: {},
  requestInProgress: false,

  init() {
    appState.storageData = localStorage.getItem('storageData') ? JSON.parse(localStorage.getItem('storageData')) : {};
  },

  // Store key+value in localstorage
  saveStorageData(key, value) {
    appState.storageData[key] = value;
    localStorage.setItem('storageData', JSON.stringify(appState.storageData));
  },
};

export default appState
