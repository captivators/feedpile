import React from 'react';
import {Provider} from 'react-redux';
import { Link } from 'react-router-dom';
import ReaderList from '../ReaderList/ReaderList';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey700 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { getArticlesFromDb } from '../../actions';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey700,
  }
});

import store from '../../store';

import './app.css';

class App extends React.Component {
  componentDidMount() {
    store.dispatch(getArticlesFromDb());
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Provider store={store}>
          <div className='app-container'>
            <Navbar />
            <Sidebar />
            <ReaderList />
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
