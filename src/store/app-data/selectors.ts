import {Dayjs} from 'dayjs';
import {ReducerNameSpace} from '../../const';
import {ItemRdo} from '../../types/item.rdo';
import {ListRdo} from '../../types/list.rdo';
import {State} from '../../types/state';

export const getItems = (state: State): ItemRdo[] => state[ReducerNameSpace.AppData].items;
export const getLists = (state: State): ListRdo[] => state[ReducerNameSpace.AppData].lists;
export const getCurrentlySelectedListId = (state: State): string | null => state[ReducerNameSpace.AppData].currentlySelectedListId;
export const getSelectedDeadline = (state: State): Dayjs | null => state[ReducerNameSpace.AppData].deadline;
