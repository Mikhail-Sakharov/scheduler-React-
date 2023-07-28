import {Divider, ListItemButton, ListItemText, Stack} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setCurrentlySelectedListId, setSelectedDeadline} from '../../store/app-data/app-data';
import {getCurrentlySelectedListId, getSelectedDeadline} from '../../store/app-data/selectors';

function AllItemsButton(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentlySelectedListId = useAppSelector(getCurrentlySelectedListId);
  const selectedDeadline = useAppSelector(getSelectedDeadline);

  const handleListItemButtonClick = () => {
    dispatch(setCurrentlySelectedListId(null));
    dispatch(setSelectedDeadline(null));
  };

  return(
    <Stack>
      <Divider />
      <ListItemButton
        onClick={handleListItemButtonClick}
        selected={!currentlySelectedListId && !selectedDeadline}
      >
        <ListItemText primary='Входящие'/>
      </ListItemButton>
    </Stack>
  );
}

export default AllItemsButton;
