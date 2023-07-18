import {Box, Button, Chip, IconButton, Popover, Stack} from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import {ADD_TO_LISTS_BUTTON_TITLE} from '../../ui-const';
import {useRef, useState} from 'react';
import {Cancel} from '@mui/icons-material';
import {useAppSelector} from '../../hooks';
import {getLists} from '../../store/app-data/selectors';
import {nanoid} from 'nanoid';

export interface AddToListsModalProps {
  setExtSelectedLists: (state: string[]) => void;
  listsIds?: string[];
}

function AddToListsModal({setExtSelectedLists, listsIds}: AddToListsModalProps): JSX.Element {
  const lists = useAppSelector(getLists);

  const addToListsButtonRef = useRef<HTMLButtonElement | null>(null);

  const [isModalOpened, setIsModalOpened] = useState(false);

  const [selectedLists, setSelectedLists] = useState<string[]>(listsIds ?? []);

  const isListSelected = (listId: string) => selectedLists.includes(listId);

  const handleAddToListsButtonClick = () => {
    setIsModalOpened(true);
  };

  const handleCloseModalButtonClick = () => {
    setExtSelectedLists(selectedLists);
    setIsModalOpened(false);
  };

  const handleChipClick = (listId: string) => {
    if (!selectedLists.includes(listId)) {
      setSelectedLists((prevState) => [...prevState, listId]);
    } else {
      setSelectedLists((prevState) => prevState.filter((list) => list !== listId));
    }
  };

  return (
    <div>
      <Button
        ref={addToListsButtonRef}
        onClick={handleAddToListsButtonClick}
        variant="outlined"
        endIcon={<PlaylistAddIcon />}
      >
        {ADD_TO_LISTS_BUTTON_TITLE}
      </Button>
      <Popover
        open={isModalOpened}
        anchorEl={addToListsButtonRef.current}
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
        <Stack sx={{margin: '10px'}}>
          <Box
            display='grid'
            gridTemplateColumns={'auto auto auto auto'}
            columnGap={1}
            rowGap={1}
          >
            {
              lists.map((list) => (
                <Box key={nanoid()}>
                  <Chip
                    label={list.title}
                    variant={isListSelected(list.id) ? 'filled' : 'outlined'}
                    onClick={() => handleChipClick(list.id)}
                  />
                </Box>
              ))
            }
          </Box>
        </Stack>
      </Popover>
    </div>
  );
}

export default AddToListsModal;
