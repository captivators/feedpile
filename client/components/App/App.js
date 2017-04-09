import React from 'react';
import {Provider} from 'react-redux';
import { Link } from 'react-router-dom';
import ReaderList from '../ReaderList/ReaderList';
import Sidebar from '../Sidebar/Sidebar';

import store from '../../store';

import './style.css';

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <div className="pure-g">
            {console.log(store.getState())}
            <Sidebar />
            <ReaderList />
          </div>
        </Provider>
    );
  }
}

export default App;
