import Router from './shared/Router';
import appState from './shared/appState';

import common from './routes/common';
import archive from './routes/archive';
// import home from './routes/home';

// Populate Router instance with DOM routes
const routes = new Router({
  common,
  archive,
  // home,
});

// Init appState utility object
appState.init();

// Load Events
routes.loadEvents()
