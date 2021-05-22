import { createAction, props } from '@ngrx/store';

export const setAppTitle = createAction('[Common Data] setAppTitle', props<{appTitle: string}>());
