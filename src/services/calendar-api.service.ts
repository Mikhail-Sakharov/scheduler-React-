import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ApiRoute, BASE_URL, ReducerNameSpace} from '../const';
import {ItemRdo} from '../types/item.rdo';

export const calendarApi = createApi({
  reducerPath: ReducerNameSpace.CalendarData,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  endpoints: (build) => ({
    getItems: build.query<ItemRdo[], undefined>({
      query: () => ApiRoute.Items
    })
  })
});

export const {useGetItemsQuery} = calendarApi;
