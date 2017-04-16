import React from 'react';
import ReaderList from '../ReaderList/ReaderList';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey700 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { getArticlesFromDb } from '../../actions';
import { connect } from 'react-redux'

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
    this.props.getArticlesFromDb();
  }

  render() {
    const { history } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
          <div className='app-container'>
            <Navbar />
            <Sidebar />
            <ReaderList history={history}/>
          </div>
      </MuiThemeProvider>
    );
  }
}
export const Unwrapped = App;
export default connect(null, {getArticlesFromDb})(App);
