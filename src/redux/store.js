import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./root-reducers";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  const logger = createLogger();
  middlewares.push(logger);
}

const createAppStore = () => {
  let store = null;
  if (
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    process.env.NODE_ENV === "development"
  ) {
    console.log("store", store);
    store = createStore(
      rootReducer,
      compose(
        applyMiddleware(...middlewares),
        window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
      )
    );
    console.log("store", store);
  } else {
    store = createStore(rootReducer, applyMiddleware(...middlewares));
  }
  sagaMiddleware.run(rootSaga);
  return store;
};

export const store = createAppStore();
