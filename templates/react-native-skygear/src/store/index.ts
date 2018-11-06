import { createStore, Store } from "redux";
import reducer, { State } from "../reducers/counter";

export function makeStore(): Store<State> {
  return createStore(reducer);
}
