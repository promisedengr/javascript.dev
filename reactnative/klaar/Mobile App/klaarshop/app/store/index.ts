import {getConfig} from '~/config/Config';
import {rootSaga} from './rootSaga';
import {getSagaMiddleware, store} from './store';

Promise.resolve().then(() => {
  getSagaMiddleware().run(rootSaga, store);

  if (__DEV__ || getConfig().useReactotron) {
    const registerCommands = require('~/commands').registerCommands;
    registerCommands();
  }
});
