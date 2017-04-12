import React from 'react';
import {Provider} from 'react-redux';
import { Link } from 'react-router-dom';
import ReaderList from '../ReaderList/ReaderList';
import Sidebar from '../Sidebar/Sidebar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from '../../store';

import './app.css';

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div className='app-container'>
            <Sidebar />
            <ReaderList />
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
