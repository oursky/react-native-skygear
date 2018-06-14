import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import reducers, { AppState } from '../reducers';

const middlewares = [
  thunk,
];

export function makeStore(intialState?: AppState): Store<AppState> {
  return createStore(
    reducers,
    intialState!,
    applyMiddleware(...middlewares)
  );
}
