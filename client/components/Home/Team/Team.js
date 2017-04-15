import React from 'react';
import Teammate from '../Teammate/Teammate'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';

const style = {
  first: {
    paddingTop: '45px',
    paddingBottom: '45px',
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#eee',
    h1: {
      color: '#fff',
      marginTop: 0,
      fontSize: '48px',
      fontFamily: 'Roboto, sans-serif',
    },
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
}

const teamInfo = [
  {
    name: 'Faiz Mohammad',
    job: 'Senior Software Engineer',
    image: 'https://s4.postimg.org/ajdilslgt/batman.jpg'
  },
  {
    name: 'Mohammad Farooqi',
    job: 'Senior Software Engineer',
    image: 'https://s4.postimg.org/ajdilslgt/batman.jpg'
  },
  {
    name: 'Alex Rosenthal',
    job: 'Scrum Master, Software Engineer',
    image: 'https://s4.postimg.org/ajdilslgt/batman.jpg'
  },
  {
    name: 'Darin Allen',
    job: 'Product Owner, Software Engineer',
    image: 'https://s4.postimg.org/ajdilslgt/batman.jpg'
  }
]

const Team = (props) => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Paper style={style.first} zDepth={4}>
      <h2>Made with ♥ by </h2>
        <div className="team" style={style.root}>
          {teamInfo.map((teamMate, index) => (
            <Teammate info={ teamMate } key={ index } />
          ))}
        </div>
    </Paper>
    </MuiThemeProvider>
    )
}

export default Team;