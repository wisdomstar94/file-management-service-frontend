import { createAction, props } from '@ngrx/store';

export const navOpen = createAction('[Common Nav Component] navOpen');
export const navClose = createAction('[Common Nav Component] navClose');
export const navModeBasic = createAction('[Common Nav Component] navModeBasic');
export const navModeMinimal = createAction('[Common Nav Component] navModeMinimal');
export const changeNavWidth = createAction('[Common Nav Component] changeNavWidth', props<{navWidth: string}>());
// export const changeNavLeft = createAction('[Common Nav Component] changeNavLeft', props<{navLeft: string}>());
