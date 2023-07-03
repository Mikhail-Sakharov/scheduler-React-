import {Divider, List, ListItemButton, ListItemText, Stack} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect, useState} from 'react';
import {getLists} from '../../store/app-data/selectors';
import {fetchListsAction} from '../../store/api-actions';
import {nanoid} from 'nanoid';

function ListsStack(): JSX.Element {
  const dispatch = useAppDispatch();

  const lists = useAppSelector(getLists);

  const [currentlySelectedListItem, setCurrentlySelectedListItem] = useState('');

  useEffect(() => {
    dispatch(fetchListsAction());
  }, [dispatch]);

  const handleListItemButtonClick = (id: string) => {
    setCurrentlySelectedListItem(id);
  };

  return (
    <List component="nav" aria-label="lists stack">
      {
        lists.map((list) => (
          <Stack key={nanoid()}>
            <Divider />
            <ListItemButton
              onClick={() => handleListItemButtonClick(list.id)}
              selected={list.id === currentlySelectedListItem}
            >
              <ListItemText primary={list.title} />
            </ListItemButton>
          </Stack>
        ))
      }
      <Divider />
    </List>
  );
}

export default ListsStack;
