import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchItemsAction} from '../../store/api-actions';
import {getCurrentlySelectedListId, getItems, getSelectedDeadline} from '../../store/app-data/selectors';
import {Stack} from '@mui/material';
import {nanoid} from 'nanoid';
import Item from '../item/item';

function InboxList(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentlySelectedListId = useAppSelector(getCurrentlySelectedListId);
  const currentlySelectedDeadline = useAppSelector(getSelectedDeadline);
  const itemsFromState = useAppSelector(getItems);

  // TODO: после добавления индикации наличия задач в календаре
  // добавить фильтрацию во входящие:
  // ----- && item.deadline === null
  const items = currentlySelectedListId === null
    ? itemsFromState.filter((item) => item.listsIds.length === 0)
    : itemsFromState;

  useEffect(() => {
    switch(currentlySelectedListId) {
      case null:
        if (currentlySelectedDeadline) {
          dispatch(fetchItemsAction({
            deadline: currentlySelectedDeadline.toISOString()
          }));
        } else {
          dispatch(fetchItemsAction());
        }
        break;
      default:
        dispatch(fetchItemsAction({
          listsIds: [currentlySelectedListId]
        }));
        break;
    }
  }, [currentlySelectedListId, currentlySelectedDeadline, dispatch]);

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
