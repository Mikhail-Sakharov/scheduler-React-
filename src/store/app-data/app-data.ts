import {createSlice} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../../const';
import {fetchItemsAction, fetchListsAction, postItemAction, postListAction, updateItemAction} from '../api-actions';
import {ItemRdo} from '../../types/item.rdo';
import {ListRdo} from '../../types/list.rdo';

type AppData = {
  items: ItemRdo[];
  lists: ListRdo[];
};

const initialState: AppData = {
  items: [],
  lists: []
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
      })
      .addCase(updateItemAction.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(postListAction.fulfilled, (state, action) => {
        state.lists = action.payload;
      })
      .addCase(fetchListsAction.fulfilled, (state, action) => {
        state.lists = action.payload;
      });
  },
});
