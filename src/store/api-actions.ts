import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {ApiRoute, BASE_URL} from '../const';
import {ItemRdo} from '../types/item.rdo';
import {CreateItemDto} from '../types/create-item.dto';
import {UpdateItemDto} from '../types/update-item.dto';
import {ListRdo} from '../types/list.rdo';
import {CreateListDto} from '../types/create-list.dto';
import {UpdateListDto} from '../types/update-list.dto';

export interface UpdateItemArgs {
  id: string;
  updateItemDto: UpdateItemDto;
}

export interface UpdateListArgs {
  id: string;
  updateListDto: UpdateListDto;
}

export const postItemAction = createAsyncThunk<ItemRdo[], CreateItemDto, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'items/post',
  async (createItemDto, {dispatch, extra: api}) => {
    const {data} = await api.post<ItemRdo[]>(`${BASE_URL}${ApiRoute.Items}`, createItemDto);
    return data;
  },
);

export const fetchItemsAction = createAsyncThunk<ItemRdo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'items/get',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<ItemRdo[]>(`${BASE_URL}${ApiRoute.Items}`);
    return data;
  },
);

export const updateItemAction = createAsyncThunk<ItemRdo[], UpdateItemArgs, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'items/update',
  async (updateItemArgs, {dispatch, extra: api}) => {
    const id = updateItemArgs.id;
    const updateItemDto = updateItemArgs.updateItemDto;
    const {data} = await api.patch<ItemRdo[]>(`${BASE_URL}${ApiRoute.Items}/${id}`, updateItemDto);
    return data;
  },
);

export const deleteItemAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'items/delete',
  async (id, {dispatch, extra: api}) => {
    await api.delete<void>(`${BASE_URL}${ApiRoute.Items}/${id}`);
  },
);

export const postListAction = createAsyncThunk<ListRdo[], CreateListDto, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'lists/post',
  async (createListDto, {dispatch, extra: api}) => {
    const {data} = await api.post<ListRdo[]>(`${BASE_URL}${ApiRoute.Lists}`, createListDto);
    return data;
  },
);

export const fetchListsAction = createAsyncThunk<ListRdo[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'lists/get',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<ListRdo[]>(`${BASE_URL}${ApiRoute.Lists}`);
    return data;
  },
);

export const deleteListAction = createAsyncThunk<ListRdo[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'lists/delete',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.delete<ListRdo[]>(`${BASE_URL}${ApiRoute.Lists}/${id}`);
    return data;
  },
);

export const updateListAction = createAsyncThunk<ListRdo[], UpdateListArgs, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'lists/update',
  async (updateListArgs, {dispatch, extra: api}) => {
    const id = updateListArgs.id;
    const updateListDto = updateListArgs.updateListDto;
    const {data} = await api.patch<ListRdo[]>(`${BASE_URL}${ApiRoute.Lists}/${id}`, updateListDto);
    return data;
  },
);
