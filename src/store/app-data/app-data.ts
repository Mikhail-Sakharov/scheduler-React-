import {createSlice} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../../const';
import {fetchItemsAction, postItemAction} from '../api-actions';
import {ItemRdo} from '../../types/item.rdo';

type AppData = {
  items: ItemRdo[];
};

const initialState: AppData = {
  items: []
};

export const appData = createSlice({
  name: ReducerNameSpace.AppData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postItemAction.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchItemsAction.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});
