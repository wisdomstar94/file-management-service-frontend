import { createReducer, on } from '@ngrx/store';
import { setActiveMenuKey } from './menu.action';
 
export const initialState: string = '';
 
const _menuActiveReducer = createReducer(
  initialState,
  on(setActiveMenuKey, (state, action) => { 
    return action.menuKey; 
  }),
);
 
export function menuActiveReducer(state: any, action: any) {
  return _menuActiveReducer(state, action);
}