import { createReducer, on } from '@ngrx/store';
import { navOpen, navClose } from './common-nav.action';
 
export const initialState = false;
 
const _commonNavisNavOpenedReducer = createReducer(
  initialState,
  on(navOpen, (state, action) => { 
    return true; 
  }),
  on(navClose, (state, action) => { 
    return false; 
  }),
);
 
export function commonNavisNavOpenedReducer(state: any, action: any) {
  return _commonNavisNavOpenedReducer(state, action);
}