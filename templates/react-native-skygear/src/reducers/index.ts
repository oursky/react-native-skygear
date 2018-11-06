import { combineReducers } from "redux";
import counter, { State as CounterState } from "./counter";

export interface State {
  counter: CounterState;
}

export default combineReducers<State>({
  counter,
});
