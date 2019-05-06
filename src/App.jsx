import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
// import TelegramLoginWidget from './components/TelegramLoginWidget';
import List from './components/list/List';

import ROUTE from './constants/routes';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          {/* <Route path={ROUTE.HOME} component={Home} exact /> */}
          <Route path={ROUTE.LIST} component={List} />
          {/* <Route path={ROUTE.SIGN} component={Signin} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
