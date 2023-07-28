import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchItemsAction} from '../../store/api-actions';
import {getCurrentlySelectedListId, getItems, getSelectedDeadline} from '../../store/app-data/selectors';
import {Stack} from '@mui/material';
import {nanoid} from 'nanoid';
import Item from '../item/item';
import {INBOX_LIST_ID} from '../../const';

function InboxList(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentlySelectedListId = useAppSelector(getCurrentlySelectedListId);
  const selectedDeadline = useAppSelector(getSelectedDeadline);
  const itemsFromState = useAppSelector(getItems);
  const items = currentlySelectedListId === INBOX_LIST_ID
    ? itemsFromState.filter((item) => item.listsIds.length === 0) // && item.deadline === null
    : itemsFromState;

  useEffect(() => {
    switch(currentlySelectedListId) {
      case INBOX_LIST_ID:
        dispatch(fetchItemsAction());
        break;
      case '':
        selectedDeadline &&
          dispatch(fetchItemsAction({
            deadline: selectedDeadline.toISOString()
          }));
        break;
      default:
        dispatch(fetchItemsAction({
          listsIds: [currentlySelectedListId]
        }));
        break;
    }
  }, [currentlySelectedListId, selectedDeadline, dispatch]);

  return (
    <Stack
      sx={{
        height: '80dvh',
        overflowY: 'scroll'
      }}
      direction={'column'}
      spacing={1}
    >
      {
        items.map((item) => (
          <Item key={nanoid()} item={item}/>
        ))
      }
    </Stack>
  );
}

export default InboxList;
