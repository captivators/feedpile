import React from 'react';
import {Provider} from 'react-redux';
import { Link } from 'react-router-dom';
import ReaderList from '../ReaderList/ReaderList';
import Sidebar from '../Sidebar/Sidebar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Layout from 'material-ui/Layout';

import store from '../../store';

import './style.css';

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div>
            {console.log(store.getState())}
            {/* Need to update the gutter size below */}
            <Layout container gutter={16}>
              <Layout item xs={3}>
                <Sidebar />
              </Layout>
              <Layout item xs={9}>
                <ReaderList />
              </Layout>
            </Layout>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
