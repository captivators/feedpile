import React from 'react';
import ReaderList from '../ReaderList/ReaderList';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey700 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    textColor: grey700,
  }
});


import './app.css';

class App extends React.Component {

  render() {
    const { history } = this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
          <div className='app-container'>
            <Navbar history={history}/>
            <Sidebar />
            <ReaderList history={history}/>
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
