import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {ApiRoute, BASE_URL} from '../const';
import {ItemRdo} from '../types/item.rdo';
import {CreateItemDto} from '../types/create-item.dto';

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
