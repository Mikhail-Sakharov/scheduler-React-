import {Divider, ListItemButton, ListItemText, Stack} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setCurrentlySelectedListId} from '../../store/app-data/app-data';
import {getCurrentlySelectedListId} from '../../store/app-data/selectors';
import {INBOX_LIST_ID} from '../../const';

function AllItemsButton(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentlySelectedListId = useAppSelector(getCurrentlySelectedListId);

  const handleListItemButtonClick = () => {
    dispatch(setCurrentlySelectedListId(INBOX_LIST_ID));
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
