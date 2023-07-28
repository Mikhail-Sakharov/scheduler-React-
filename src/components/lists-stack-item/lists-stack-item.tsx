import {Divider, IconButton, ListItemButton, ListItemText, Stack, TextField} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {Cancel} from '@mui/icons-material';
import {ChangeEvent, useEffect, useState} from 'react';
import {ListRdo} from '../../types/list.rdo';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {deleteListAction, updateListAction} from '../../store/api-actions';
import {setCurrentlySelectedListId, setSelectedDeadline} from '../../store/app-data/app-data';
import {getCurrentlySelectedListId} from '../../store/app-data/selectors';
import {INBOX_LIST_ID} from '../../const';

export interface ListsStackItemProps {
  list: ListRdo;
}

function ListsStackItem(
  {list}: ListsStackItemProps
): JSX.Element {
  const dispatch = useAppDispatch();

  const currentlySelectedListId = useAppSelector(getCurrentlySelectedListId);

  const [isContentEditable, setContentEditable] = useState(false);

  const [titleValue, setTitleValue] = useState(list.title);
  const [titleHelperText, setTitleHelperText] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (titleValue.length >= 5 && titleValue.length <= 30) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [titleValue.length]);

  const handleListItemButtonClick = (id: string) => {
    dispatch(setCurrentlySelectedListId(id));
    dispatch(setSelectedDeadline(null));
  };

  const onDeleteButtonDispatchData = async () => {
    await dispatch(deleteListAction(list.id));
    dispatch(setCurrentlySelectedListId(INBOX_LIST_ID));
  };

  const handleDeleteListButtonClick = () => {
    onDeleteButtonDispatchData();
  };

  const handleSaveButtonClick = () => {
    if (isFormValid) {
      setContentEditable(false);
      dispatch(updateListAction({
        id: list.id,
        updateListDto: {
          title: titleValue
        }
      }));
    }
  };

  const handleCloseButtonClick = () => {
    setContentEditable(false);
  };

  const handleEditButtonClick = () => {
    setContentEditable(true);
  };

  const handleTitleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setTitleValue(value);
    if (value.length === 0) {
      setTitleHelperText('Введите название');
    }
    if (value.length > 30) {
      setTitleHelperText('Максимальная длина 30 символов');
    }
    if (value.length >= 1 && value.length < 5) {
      setTitleHelperText('Минимальная длина 5 символов');
    }
    if (value.length >= 5 && value.length <= 30) {
      setTitleHelperText('');
    }
  };

  return (
    <Stack>
      <Divider />
      <Stack direction={'row'} justifyContent={'space-between'}>
        {
          isContentEditable
            ? (
              <TextField
                sx={{
                  border: '4.5px solid orange',
                  borderRadius: '7px'
                }}
                defaultValue={list.title}
                onChange={handleTitleInputChange}
                error={titleHelperText !== ''}
                helperText={titleHelperText}
                size='small'
              />
            )
            : (
              <ListItemButton
                onClick={() => handleListItemButtonClick(list.id)}
                selected={list.id === currentlySelectedListId}
              >
                <ListItemText primary={list.title}/>
              </ListItemButton>
            )
        }
        <Stack direction={'row'} alignItems={'center'}>
          {
            isContentEditable
              ? (
                <>
                  <IconButton onClick={handleDeleteListButtonClick}>
                    <DeleteIcon color='error'/>
                  </IconButton>
                  <IconButton onClick={handleSaveButtonClick}>
                    <SaveIcon color='primary'/>
                  </IconButton>
                  <IconButton onClick={handleCloseButtonClick}>
                    <Cancel />
                  </IconButton>
                </>
              )
              : (
                <IconButton onClick={handleEditButtonClick}>
                  <EditIcon />
                </IconButton>
              )
          }
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ListsStackItem;
