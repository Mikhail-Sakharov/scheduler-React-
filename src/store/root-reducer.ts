import {combineReducers} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../const';
import {appData} from './app-data/app-data';
import {calendarApi} from '../services/calendar-api.service';

export const rootReducer = combineReducers({
  [ReducerNameSpace.AppData]: appData.reducer,
  [ReducerNameSpace.CalendarData]: calendarApi.reducer
});
