import { createAction, props } from '@ngrx/store';

export const setActiveMenuKey = createAction('[Common Data] setActiveMenuKey', props<{menuKey: string}>());
