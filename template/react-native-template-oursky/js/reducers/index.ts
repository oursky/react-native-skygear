import { combineReducers } from 'redux';
import counter from './counter';
import { State as CounterState } from './counter';

export interface AppState {
  counter: CounterState;
}

export default combineReducers<AppState>({
  counter,
});
