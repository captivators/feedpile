import React from 'react';
import './Feature.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {CardHeader, Card, CardText} from 'material-ui/Card';
import Amber from 'material-ui/styles/colors'

const Feature = (props) => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <div className="root">
    <Card zDepth={5}>
      <CardHeader
        title={props.info.name}
        textStyle={{alignSelf: "center"}}
        actAsExpander={true}
        showExpandableButton={true}
        className="first"
      />
      <CardText expandable={true}>
        <ul>
        <li>{props.info.featureName}</li>
        <br/>
        <li>{props.info.description}</li>
        </ul>
      </CardText>
    </Card>
    </div>
    </MuiThemeProvider>
    )
}

export default Feature;