import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import debounce from "debounce-promise";

import reducer from "./reducer";

import DataCache from "./dataCache";

const logger = store => next => action => {
  console.log("action:", action);
  return next(action);
};

export const setupStore = ({ httpApi }) => {

  const middlewares = [];

  middlewares.push(
    reduxThunk.withExtraArgument({
      // TODO something is missing here
      httpApi: httpApi,
      dataCache: new DataCache(),
      debounce,
    }),
  );

  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
  }

  return createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(...middlewares),
    ),
  );
};
