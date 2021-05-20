import { createReducer, on } from '@ngrx/store';
import { changeDestination } from './destination.action';
 
export const initialState: string[] = ['홈'];
 
const _destinationReducer = createReducer(
  initialState,
  on(changeDestination, (state, action) => { 
    return action.destination; 
  }),
);
 
export function destinationReducer(state: any, action: any) {
  return _destinationReducer(state, action);
}