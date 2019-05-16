import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import List from './components/list/List';
import CreatePost from './components/CreatePost';
import Home from './components/Home';

import routes from './constants/routes';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route path={routes.home} component={Home} exact />
          <Route path={routes.list} component={List} />
          <Route path={routes.post} component={CreatePost} />
          {/* <Route path={routes.help} component={Help} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
