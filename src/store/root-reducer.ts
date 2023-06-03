import {combineReducers} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../const';
import {appData} from './app-data/app-data';

export const rootReducer = combineReducers({
  [ReducerNameSpace.AppData]: appData.reducer
});
