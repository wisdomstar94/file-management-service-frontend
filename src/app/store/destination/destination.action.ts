import { createAction, props } from '@ngrx/store';

export const changeDestination = createAction('[Common Data] changeDestination', props<{destination: string[]}>());
