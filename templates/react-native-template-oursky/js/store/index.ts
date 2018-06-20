import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import reducers, { ApplicationState } from '../reducers';

const middlewares = [
  thunk,
];

export function makeStore(intialState?: ApplicationState): Store<ApplicationState> {
  return createStore(
    reducers,
    intialState!,
    applyMiddleware(...middlewares)
  );
}
