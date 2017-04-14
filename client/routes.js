import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/App/App';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';

const Routes = (props) => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/app" component={App} />
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;
