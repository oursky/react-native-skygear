import { Action } from "../actions";

export interface State {
  count: number;
}

const initialState: State = {
  count: 0,
};

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case "Increment":
      return {
        ...state,
        count: state.count + action.payload.count,
      };
    case "Decrement":
      return {
        ...state,
        count: state.count - action.payload.count,
      };
  }
  return state;
}
