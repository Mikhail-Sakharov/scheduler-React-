import CreateItemModal from '../create-item-modal/create-item-modal';
import InboxList from '../inbox-list/inbox-list';

function App(): JSX.Element {

  return (
    <div>
      <CreateItemModal />
      <InboxList />
    </div>
  );
}

export default App;
