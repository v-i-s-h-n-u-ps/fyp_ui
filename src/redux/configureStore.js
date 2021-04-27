import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

import { refreshMiddleWare } from "./middlewares";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  let middleware = [refreshMiddleWare, sagaMiddleware];
  // middleware = [...middleware, logger];
  const middlewareEnhancer = applyMiddleware(...middleware);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const logoutResetEnhancer = rootReducer => (state, action) => {
    if (action.type !== "LOGOUT_SUCCESS") 
      return rootReducer(state, action);
    const newState = rootReducer(undefined, {});
    return newState;
  };

  const store = createStore(
      logoutResetEnhancer(rootReducer),
      initialState,
      composedEnhancers
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
