import { combineReducers } from 'redux';
import app, { State as AppState } from './app';
import counter, { State as CounterState } from './counter';

export interface ApplicationState {
  app: AppState;
  counter: CounterState;
}

export default combineReducers<ApplicationState>({
  app,
  counter,
});
