import React from 'react';
import ReaderList from '../ReaderList/ReaderList';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey700 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Progress from '../Progress/Progress'
import { connect } from 'react-redux'

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
            {
              this.props.displayProgress ? <Progress /> : null
            }
            <Navbar history={history}/>
            <Sidebar />
            <ReaderList history={history}/>
          </div>
      </MuiThemeProvider>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    displayProgress : state.displayProgress
  }
};

export const Unwrapped = App;
export default connect(MapStateToProps)(App);
