import { createReducer, on } from '@ngrx/store';
import { DeviceMode } from 'src/app/types/device-mode';
import { setMobile, setPC } from './device-mode.action';
 
export const initialState = 'pc'; 
 
const _deviceModeReducer = createReducer(
  initialState,
  on(setMobile, (state) => { 
    return 'mobile'; 
  }),
  on(setPC, (state) => { 
    return 'pc'; 
  }),
);
 
export function deviceModeReducer(state: any, action: any) {
  return _deviceModeReducer(state, action);
}