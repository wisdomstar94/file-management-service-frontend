import { createAction, props } from '@ngrx/store';

export const changeNavWidth = createAction('[Common Nav Component] changeNavWidth', props<{navWidth: string}>());
