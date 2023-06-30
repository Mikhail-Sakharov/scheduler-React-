import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchItemsAction} from '../../store/api-actions';
import {getItems} from '../../store/app-data/selectors';
import {Stack} from '@mui/material';
import {nanoid} from 'nanoid';
import Item from '../item/item';

function InboxList(): JSX.Element {
  const dispatch = useAppDispatch();

  const items = useAppSelector(getItems);

  useEffect(() => {
    dispatch(fetchItemsAction());
  }, [dispatch]);

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
