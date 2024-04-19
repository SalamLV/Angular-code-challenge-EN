import { createReducer, on } from '@ngrx/store';
import * as PlateActions from './plate.actions';

export interface State {
  data: string;
}

export const initialState: State = {
  data: '',
};

export const plateReducer = createReducer(
  initialState,
  on(PlateActions.savePlate, (state, action): any => {
    return { ...state, data: action.data };
  })
);
