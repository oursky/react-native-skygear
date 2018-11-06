import {
  createStore,
  applyMiddleware,
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
} from "redux";
import thunk, {
  ThunkAction as _ThunkAction,
  ThunkDispatch as _ThunkDispatch,
} from "redux-thunk";
import reducers, { State } from "../reducers";
import { Action } from "../actions";

export type ThunkAction<R> = _ThunkAction<R, State, undefined, Action>;
type ThunkDispatch = _ThunkDispatch<State, undefined, Action>;
export type Dispatch = ReduxDispatch & ThunkDispatch;

interface Store<S> extends ReduxStore<S> {
  dispatch: Dispatch;
}

export function makeStore(): Store<State> {
  const middlewares = [thunk];
  return createStore(reducers, applyMiddleware(...middlewares));
}
