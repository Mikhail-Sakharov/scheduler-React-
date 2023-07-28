import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchItemsAction} from '../../store/api-actions';
import {getCurrentlySelectedListId, getItems} from '../../store/app-data/selectors';
import {Stack} from '@mui/material';
import {nanoid} from 'nanoid';
import Item from '../item/item';
import {INBOX_LIST_ID} from '../../const';

function InboxList(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentlySelectedListId = useAppSelector(getCurrentlySelectedListId);
  const itemsFromState = useAppSelector(getItems);
  const items = currentlySelectedListId === INBOX_LIST_ID
    ? itemsFromState.filter((item) => item.listsIds.length === 0) // && item.deadline === null
    : itemsFromState;

  useEffect(() => {
    if (currentlySelectedListId === INBOX_LIST_ID) {
      dispatch(fetchItemsAction());
    } else {
      dispatch(fetchItemsAction({
        listsIds: [currentlySelectedListId]
      }));
    }
  }, [currentlySelectedListId, dispatch]);

  return (
    <Stack direction={'column'} spacing={1}>
      {
        items.map((item) => (
          <Item key={nanoid()} item={item}/>
        ))
      }
    </Stack>
  );
}

export default InboxList;
