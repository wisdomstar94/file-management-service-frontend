import { createReducer, on } from '@ngrx/store';
import { setAppTitle } from './app-title.action';
 
export const initialState: string = 'File Management Service';
 
const _appTitleReducer = createReducer(
  initialState,
  on(setAppTitle, (state, action) => { 
    return action.appTitle; 
  }),
);
 
export function appTitleReducer(state: any, action: any) {
  return _appTitleReducer(state, action);
}