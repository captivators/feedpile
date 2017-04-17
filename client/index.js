import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './store';

import routes from './routes';

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter history={browserHistory}
                     children={routes}>
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
