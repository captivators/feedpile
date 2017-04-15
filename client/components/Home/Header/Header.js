import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

const style = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
}

const Header = (props) => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <AppBar style={style.root}
    title="Feedpile"
    iconElementRight={<FlatButton label="Sign in" />}
    />
    </MuiThemeProvider>
  )
}

export default Header;