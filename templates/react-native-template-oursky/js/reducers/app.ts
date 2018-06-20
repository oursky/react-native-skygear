import { Action } from 'redux';

export type Locale = 'en';

export interface State {
  locale: Locale;
}

const initialState: State = {
  locale: 'en',
};

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
