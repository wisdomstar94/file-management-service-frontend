import { createReducer, on } from '@ngrx/store';
import { navModeBasic, navModeMinimal } from './common-nav.action';
 
export const initialState = 'basic';
 
const _commonNavModeReducer = createReducer(
  initialState,
  on(navModeBasic, (state, action) => { 
    return 'basic';
  }),
  on(navModeMinimal, (state, action) => { 
    return 'minimal';
  }),
);
 
export function commonNavModeReducer(state: any, action: any) {
  return _commonNavModeReducer(state, action);
}