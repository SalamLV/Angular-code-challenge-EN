import { createAction, props } from '@ngrx/store';

export const savePlate = createAction(
  '[Plate Component] Save Successful Plate',
  props<{ data: string }>()
);
export const loadPlate = createAction(
  '[Plate Component] Load Last Successful Plate'
);
