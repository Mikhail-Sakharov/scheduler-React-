import {createSlice} from '@reduxjs/toolkit';
import {ReducerNameSpace} from '../../const';
import {
  deleteListAction,
  fetchItemsAction,
  fetchListsAction,
  postListAction,
  updateListAction
} from '../api-actions';
import {ItemRdo} from '../../types/item.rdo';
import {ListRdo} from '../../types/list.rdo';

type AppData = {
  items: ItemRdo[];
  lists: ListRdo[];
  currentlySelectedListId: string;
};

const initialState: AppData = {
  items: [],
  lists: [],
  currentlySelectedListId: ''
};

export const appData = createSlice({
  name: ReducerNameSpace.AppData,
  initialState,
  reducers: {
    setCurrentlySelectedListId: (state, action) => {
      state.currentlySelectedListId = action.payload as string;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchItemsAction.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(postListAction.fulfilled, (state, action) => {
        state.lists = action.payload;
      })
      .addCase(fetchListsAction.fulfilled, (state, action) => {
        state.lists = action.payload;
      })
      .addCase(updateListAction.fulfilled, (state, action) => {
        state.lists = action.payload;
      })
      .addCase(deleteListAction.fulfilled, (state, action) => {
        state.lists = action.payload;
      });
  },
});

export const {
  setCurrentlySelectedListId
} = appData.actions;
