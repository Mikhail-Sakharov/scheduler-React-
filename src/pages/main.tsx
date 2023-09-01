import {Button, Stack} from '@mui/material';
// import CreateItemModal from '../components/create-item-modal/create-item-modal';
import InboxList from '../components/inbox-list/inbox-list';
import Header from '../components/header/header';
import Calendar from '../components/calendar/calendar';
import ListsStack from '../components/lists-stack/lists-stack';
import CreateListModal from '../components/create-list-modal/create-list-modal';
import CreateItemModalUpdated from '../components/create-item-modal/create-item-modal-updated';
import {AddTask} from '@mui/icons-material';
import {CREATE_NEW_LIST_ITEM_BUTTON_TITLE} from '../ui-const';
import {useState} from 'react';
import {useAppSelector} from '../hooks';
import {getSelectedDeadline} from '../store/app-data/selectors';

function Main(): JSX.Element {
  const deadline = useAppSelector(getSelectedDeadline);

  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleCreateNewItemButtonClick = () => {
    setIsModalOpened(true);
  };

  return (
    <Stack direction={'column'} spacing={1}>
      <Header />
      <Stack direction={'row'} spacing={1}>
        <Stack direction={'column'} width={400} spacing={1}>
          <CreateListModal/>
          <ListsStack />
        </Stack>
        <Stack direction={'column'} spacing={1} flex={'auto'}>
          <Button
            onClick={handleCreateNewItemButtonClick}
            variant="contained"
            endIcon={<AddTask />}
          >
            {CREATE_NEW_LIST_ITEM_BUTTON_TITLE}
          </Button>
          <CreateItemModalUpdated
            isModalOpened={isModalOpened}
            setIsModalOpened={setIsModalOpened}
          />
          <InboxList />
        </Stack>
        <Stack direction={'column'} spacing={1}>
          <Calendar externalValue={deadline}/>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Main;
