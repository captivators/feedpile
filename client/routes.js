import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/App/App';
import About from './components/About/About';
import NotFound from './components/NotFound/NotFound';

const Routes = (props) => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/about" component={About} />

        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;
