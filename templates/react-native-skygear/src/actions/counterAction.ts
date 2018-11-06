export type CounterAction = "Increment" | "Decrement";

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
