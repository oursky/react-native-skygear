import {
  IncrementCountAction,
  DecrementCountAction,
  ChangeCountAction,
} from "./counterAction";

export type Action =
  | IncrementCountAction
  | DecrementCountAction
  | ChangeCountAction;
