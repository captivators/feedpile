import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import Paper from 'material-ui/Paper'

import FeatureList from '../FeatureList/FeatureList'
import Team from '../Team/Team'
import TechList from '../TechList/TechList'
import Header from '../Header/Header'
import Main from '../Main/Main'

const style = {
first: {
    paddingTop: '45px',
    paddingBottom: '45px',
    width: '100%',
    textAlign: 'center',
    h1: {
      color: '#fff',
      marginTop: 0,
      fontSize: '48px',
    },
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '25%',
    overflowY: 'auto',
    marginBottom: '24px',
    textAlign: 'center',
  },
  porthole: {
    borderRadius: '100%',
    width: '75%',
    maxWidth: '200px',
    margin: '15px auto',
    display: 'block',
  },
  logoList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  logos: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '18%',
    maxWidth: '150px',
    margin: '2px 10px',
  },
  instructions: {
    width: '100%',
    maxWidth: '640px',
  },

}

const Home = (props) => {



    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
        <Header history={props.history}/>

        <Main />

        <FeatureList />

        <Team />

        <TechList />
        </div>

      </MuiThemeProvider>
    );
  }

export default Home;
