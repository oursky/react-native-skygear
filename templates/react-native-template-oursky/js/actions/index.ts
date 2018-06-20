import { Action } from 'redux';

export interface IncrementAction extends Action {
  type: 'IncrementAction';
  payload: {
    count: number,
  };
}

export interface DecrementAction extends Action {
  type: 'DecrementAction';
  payload: {
    count: number,
  };
}

export function increment(count: number): IncrementAction {
  return {
    type: 'IncrementAction',
    payload: {
      count,
    },
  };
}

export function decrement(count: number): DecrementAction {
  return {
    type: 'DecrementAction',
    payload: {
      count,
    },
  };
}
