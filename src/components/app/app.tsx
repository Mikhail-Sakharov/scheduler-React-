import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Main from '../../pages/main';
import {AppRoute} from '../../const';

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
