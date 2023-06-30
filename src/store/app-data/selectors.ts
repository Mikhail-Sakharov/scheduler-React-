import {ReducerNameSpace} from '../../const';
import {ItemRdo} from '../../types/item.rdo';
import {State} from '../../types/state';

export const getItems = (state: State): ItemRdo[] => state[ReducerNameSpace.AppData].items;
