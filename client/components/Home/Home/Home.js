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
import Progress from '../../Progress/Progress'
import { connect } from 'react-redux';

const Home = (props) => {



    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>

        <div style={{backgroundColor: "#00BCD4"}}>

          {
            props.displayProgress ? <Progress /> : null
          }

          <Header history={props.history}/>

          <Main />

          <FeatureList />

          <Team />

          <TechList />

        </div>

      </MuiThemeProvider>
    );
  }

const MapStateToProps = (state) => {
  return {
    displayProgress : state.displayProgress
  }
};
export const Unwrapped = Home;
export default connect(MapStateToProps)(Home);

