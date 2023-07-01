import CreateItemModal from '../components/create-item-modal/create-item-modal';
import InboxList from '../components/inbox-list/inbox-list';

function InboxPage(): JSX.Element {
  return (
    <>
      <CreateItemModal />
      <InboxList />
    </>
  );
}

export default InboxPage;
