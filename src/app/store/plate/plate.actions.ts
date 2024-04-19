import { createAction, props } from '@ngrx/store';

export const savePlate = createAction(
  '[Plate Component] Save Sucessfull Plate',
  props<{ data: string }>()
);
export const loadPlate = createAction(
  '[Plate Component] Load Last Sucessfull Plate'
);
