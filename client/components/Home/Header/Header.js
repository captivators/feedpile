import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import indigoA400 from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import './Header.css'

const muiTheme = getMuiTheme({
  pallette: {
    textColor: indigoA400
  },
  appBar: {
    height: 50,
  },
})

const style = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
}

const Header = (props) => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
    <AppBar className="header"
    title="Feedpile"
    iconElementRight={<FlatButton label="Sign in" />}
    zDepth={4}
    />
    </MuiThemeProvider>
  )
}

export default Header;