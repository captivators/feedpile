import React from 'react';
import './Feature.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {CardHeader, Card, CardText} from 'material-ui/Card';

const Feature = (props) => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <div className="root">
    <Card zDepth={5}>
      <CardHeader
        title={props.info.name}
        titleColor={'white'}
        actAsExpander={true}
        showExpandableButton={true}
        className="card-header"
      />
      <CardText
      expandable={true}>
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