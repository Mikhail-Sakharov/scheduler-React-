import {createSlice} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../../const';

const initialState = {};

export const appData = createSlice({
  name: ReducerNameSpace.AppData,
  initialState,
  reducers: {}
});
