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

const Home = (props) => {



    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
        <Header />

        <Main />

        <FeatureList />

        <Team />

        <TechList />
        </div>

      </MuiThemeProvider>
    );
  }

export default Home;

