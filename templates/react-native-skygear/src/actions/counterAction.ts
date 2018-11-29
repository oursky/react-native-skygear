import { ThunkAction } from "../store";

export interface IncrementCountAction {
  type: "Increment";
  payload: {
    count: number;
  };
}

export function incrementAction(count: number): IncrementCountAction {
  return {
    type: "Increment",
    payload: {
      count,
    },
  };
}

export interface DecrementCountAction {
  type: "Decrement";
  payload: {
    count: number;
  };
}

export function decrementAction(count: number): DecrementCountAction {
  return {
    type: "Decrement",
    payload: {
      count,
    },
  };
}

export interface ChangeCountAction {
  type: "ChangeCount";
  payload: {
    count: number;
  };
}

export function changeCountAction(count: number): ThunkAction<Promise<number>> {
  return dispatch => {
    return Promise.resolve(count).then(_asyncCount => {
      dispatch({
        type: "ChangeCount",
        payload: {
          count,
        },
      });
      return count;
    });
  };
}
