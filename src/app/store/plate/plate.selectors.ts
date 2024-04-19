import { createSelector } from '@ngrx/store';
import { State } from './plate.reducer';

export const selectPlateData = (state: State) => state.data;

export const getPlateData = createSelector(selectPlateData, (data) => data);
