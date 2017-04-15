import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';

const style = {
  first: {
    paddingTop: '45px',
    paddingBottom: '45px',
    width: '100%',
    height: '200px',
    textAlign: 'center',
    h1: {
      color: '#fff',
      marginTop: 0,
      fontSize: '48px',
    }
  }
}

const Feature = (props) => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Paper zDepth={5}>
    <div style={style.first}>
      <i className="large material-icon splash-icons"></i>
      <h5>{props.info.featureName}</h5>
      <p>{props.info.description}</p>
    </div>
    </Paper>
    </MuiThemeProvider>
    )
}

export default Feature;