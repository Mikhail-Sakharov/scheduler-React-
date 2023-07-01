import {BrowserRouter, Route, Routes} from 'react-router-dom';
import InboxPage from '../../pages/inbox';
import {AppRoute} from '../../const';

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Inbox} element={<InboxPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
