import {Add, AddTask, Cancel} from '@mui/icons-material';
import {
  Button,
  IconButton,
  Popover,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useAppDispatch} from '../../hooks';
import {
  CREATE_BUTTON_TITLE
} from '../../ui-const';
import {fetchListsAction, postListAction} from '../../store/api-actions';

function CreateListModal(): JSX.Element {
  const dispatch = useAppDispatch();

  const [isModalOpened, setIsModalOpened] = useState(false);

  const createNewListButtonRef = useRef<HTMLButtonElement | null>(null);

  const [titleValue, setTitleValue] = useState('');
  const [titleHelperText, setTitleHelperText] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (titleValue.length >= 5 && titleValue.length <= 30) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [titleValue.length]);

  const onCreateButtonClickDispatch = async () => {
    await dispatch(postListAction({
      title: titleValue
    }));
    dispatch(fetchListsAction());
  };

  const handleCreateButtonClick = () => {
    if (isFormValid) {
      setTitleValue('');
      setIsModalOpened(false);
      onCreateButtonClickDispatch();
    }
    if (!titleValue) {
      setTitleHelperText('Введите название');
    }
  };

  const handleCreateNewListButtonClick = () => {
    setIsModalOpened(true);
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

  const handleCloseModalButtonClick = () => {
    setTitleHelperText('');
    setIsModalOpened(false);
  };

  return (
    <div>
      <Button
        ref={createNewListButtonRef}
        onClick={handleCreateNewListButtonClick}
        variant="contained"
        endIcon={<AddTask />}
      >
        Создать список
      </Button>
      <Popover
        open={isModalOpened}
        anchorEl={createNewListButtonRef.current}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Stack direction="row" justifyContent={'flex-end'}>
          <IconButton onClick={handleCloseModalButtonClick}>
            <Cancel />
          </IconButton>
        </Stack>
        <Stack
          sx={{
            padding: 2
          }}
          spacing={2}
          direction="column"
        >
          <Typography sx={{ p: 2 }}>
            Введите название списка
          </Typography>
          <TextField
            error={titleHelperText !== ''}
            helperText={titleHelperText}
            onChange={handleTitleInputChange}
            label="Название"
            variant="outlined"
          />
          <Stack direction="row" spacing={2} justifyContent={'center'}>
            <Button
              onClick={handleCreateButtonClick}
              variant="contained"
              endIcon={<Add />}
            >
              {CREATE_BUTTON_TITLE}
            </Button>
          </Stack>
        </Stack>
      </Popover>
    </div>
  );
}

export default CreateListModal;
