import {Stack} from '@mui/material';
import CreateItemModal from '../components/create-item-modal/create-item-modal';
import InboxList from '../components/inbox-list/inbox-list';
import Header from '../components/header/header';
import Calendar from '../components/calendar/calendar';

function InboxPage(): JSX.Element {
  return (
    <Stack direction={'column'} spacing={1}>
      <Header />
      <Stack direction={'row'} spacing={1}>
        <Stack direction={'column'} width={400} spacing={1}>
          <CreateItemModal />
          <InboxList />
        </Stack>
        <Stack direction={'column'} spacing={1}>
          <CreateItemModal />
          <InboxList />
        </Stack>
        <Stack direction={'column'} spacing={1}>
          <Calendar />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default InboxPage;
