import { createReducer, on } from '@ngrx/store';
import { changeNavWidth } from './common-nav.action';
 
export const initialState = '240px';
 
const _commonNavWidthReducer = createReducer(
  initialState,
  on(changeNavWidth, (state, action) => { 
    return action.navWidth; 
  }),
);
 
export function commonNavWidthReducer(state: any, action: any) {
  return _commonNavWidthReducer(state, action);
}