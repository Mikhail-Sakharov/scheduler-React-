import {Divider, ListItemButton, ListItemText, Stack} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setCurrentlySelectedListId} from '../../store/app-data/app-data';
import {fetchItemsAction} from '../../store/api-actions';
import {getCurrentlySelectedListId} from '../../store/app-data/selectors';

export const INBOX_LIST_ID = 'INBOX_LIST_ID';

function AllItemsButton(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentlySelectedListId = useAppSelector(getCurrentlySelectedListId);

  const handleListItemButtonClick = () => {
    dispatch(setCurrentlySelectedListId(INBOX_LIST_ID));
    dispatch(fetchItemsAction());
  };

  return(
    <Stack>
      <Divider />
      <ListItemButton
        onClick={handleListItemButtonClick}
        selected={currentlySelectedListId === INBOX_LIST_ID}
      >
        <ListItemText primary='Входящие'/>
      </ListItemButton>
    </Stack>
  );
}

export default AllItemsButton;
