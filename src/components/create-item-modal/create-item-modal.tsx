import {Add, AddTask, Cancel} from '@mui/icons-material';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {ItemType, ItemTypeMap} from '../../types/item-type.enum';
import {nanoid} from 'nanoid';
import DeadlineDatePicker from '../date-picker/date-picker';

function CreateItemModal(): JSX.Element {
  // const dispatch = useAppDispatch();

  const [isModalOpened, setIsModalOpened] = useState(false);

  const createNewItemButtonRef = useRef<HTMLButtonElement | null>(null);

  const [titleValue, setTitleValue] = useState('');
  const [titleHelperText, setTitleHelperText] = useState('');

  const [descriptionValue, setDescriptionValue] = useState('');
  const [descriptionHelperText, setDescriptionHelperText] = useState('');

  const [itemType, setItemType] = useState(ItemType.Task);

  const [deadline, setDeadline] = useState<string | undefined>(undefined);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (titleValue.length >= 5 && titleValue.length <= 30 && descriptionValue.length <= 230) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [descriptionValue.length, titleValue.length]);

  const handleCreateButtonClick = () => {
    if (isFormValid) {
      setTitleValue('');
      setDescriptionValue('');
      setDeadline(undefined);
      setIsModalOpened(false);
      console.log(titleValue);
      console.log(descriptionValue);
      console.log(itemType);
      console.log(deadline);
    }
    if (!titleValue) {
      setTitleHelperText('Введите название');
    }
  };

  const handleCreateNewItemButtonClick = () => {
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

  const handleDescriptionInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setDescriptionValue(value);
    if (value.length > 230) {
      setDescriptionHelperText('Максимальная длина 230 символов');
    } else {
      setDescriptionHelperText('');
    }
  };

  const handleItemTypeInputChange = (evt: SelectChangeEvent) => {
    const value = evt.target.value as ItemType;
    setItemType(value);
  };

  const handleCloseModalButtonClick = () => {
    setTitleHelperText('');
    setDescriptionHelperText('');
    setIsModalOpened(false);
  };

  return (
    <div>
      <Button
        ref={createNewItemButtonRef}
        onClick={handleCreateNewItemButtonClick}
        variant="contained"
        endIcon={<AddTask />}
      >
        Добавить новый элемент
      </Button>
      <Popover
        open={isModalOpened}
        anchorEl={createNewItemButtonRef.current}
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
            Создайте новый список или элемент для существующего
          </Typography>
          <TextField
            error={titleHelperText !== ''}
            helperText={titleHelperText}
            onChange={handleTitleInputChange}
            label="Название"
            variant="outlined"
          />
          <TextField
            error={descriptionHelperText !== ''}
            helperText={descriptionHelperText}
            onChange={handleDescriptionInputChange}
            label="Описание"
            multiline
            rows={4}
          />
          <Stack direction={'row'} spacing={2}>
            <FormControl fullWidth>
              <InputLabel
                id="item-type-select"
              >
                Тип
              </InputLabel>
              <Select
                defaultValue={ItemType.Task}
                labelId="item-type-select"
                label="Тип"
                onChange={handleItemTypeInputChange}
              >
                {
                  Object.values(ItemType).map((item) => (
                    <MenuItem key={nanoid()} value={item}>
                      {ItemTypeMap[item]}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <DeadlineDatePicker setDeadline={setDeadline}/>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent={'center'}>
            <Button
              onClick={handleCreateButtonClick}
              variant="contained"
              endIcon={<Add />}
            >
              Создать
            </Button>
          </Stack>
        </Stack>
      </Popover>
    </div>
  );
}

export default CreateItemModal;
