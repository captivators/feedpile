import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReadArticle from './components/ReadArticle/ReadArticle'
import App from './components/App/App';
import Home from './components/Home/Home/Home';
import NotFound from './components/NotFound/NotFound';

const Routes = (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/app" component={App} />
        <Route path="/read" component={ReadArticle} />
        <Route component={NotFound} />
      </Switch>
    </div>
);

export default Routes;

