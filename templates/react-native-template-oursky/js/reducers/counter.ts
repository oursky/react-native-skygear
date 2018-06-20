import { IncrementAction, DecrementAction } from '../actions';

export interface State {
  count: number;
}

const initialState: State = {
  count: 0,
};

export default function reducer(
  state: State = initialState,
  action: IncrementAction | DecrementAction
) {
  switch (action.type) {
    case 'IncrementAction':
      return {
        ...state,
        count: state.count + action.payload.count,
      };
    case 'DecrementAction':
      return {
        ...state,
        count: state.count - action.payload.count,
      };
    default:
      return state;
  }
}
