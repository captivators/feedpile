import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReadArticle from './components/ReadArticle/ReadArticle'
import App from './components/App/App';
import About from './components/About/About';
import NotFound from './components/NotFound/NotFound';

const Routes = (
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/about" component={About} />
        <Route path="/read" component={ReadArticle} />
        <Route component={NotFound} />
      </Switch>
    </div>
);

export default Routes;
