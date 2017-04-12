import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ListIcon from 'material-ui-icons/List';
import LaptopMac from 'material-ui-icons/LaptopMac';
import Star from 'material-ui-icons/Star';
import Games from 'material-ui-icons/Games';
import MusicNote from 'material-ui-icons/MusicNote';
import Public from 'material-ui-icons/Public';
import Description from 'material-ui-icons/Description';

import './Sidebar.css';
import { connect } from 'react-redux';
import { toggleListItem } from '../../actions'

const Sidebar = (props) => {
  return (
    <div className="sidebar-container">
      <img className="sidebar-logo" src={"https://s3-us-west-1.amazonaws.com/thesis.feedpile.images/feedpile.png"} />
      <h2 className="logo-name">Feedpile</h2>
      <List>
        <ListItem primaryText="All Articles" leftIcon={<ListIcon />} />
        <ListItem primaryText="Starred" leftIcon={<Star />} />
        <ListItem
          primaryText="Technology"
          leftIcon={<LaptopMac />}
          initiallyOpen={props.open}
          onNestedListToggle={props.dispatchToggle}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="TechCrunch"
              leftIcon={<Description />}
            />,
            <ListItem
              key={2}
              primaryText="The Verge"
              leftIcon={<Description />}
            />,
            <ListItem
              key={3}
              primaryText="WIRED"
              leftIcon={<Description />}
            />
          ]}
        />
        <ListItem
          primaryText="Music"
          leftIcon={<MusicNote />}
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          onNestedListToggle={props.dispatchToggle}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="SPIN"
              leftIcon={<Description />}
            />,
            <ListItem
              key={2}
              primaryText="Rolling Stone"
              leftIcon={<Description />}
            />,
            <ListItem
              key={3}
              primaryText="Pitchfork"
              leftIcon={<Description />}
            />
          ]}
        />
        <ListItem
          primaryText="Games"
          leftIcon={<Games />}
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          onNestedListToggle={props.dispatchToggle}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="IGN"
              leftIcon={<Description />}
            />,
            <ListItem
              key={2}
              primaryText="Gamespot"
              leftIcon={<Description />}
            />,
            <ListItem
              key={3}
              primaryText="Rock, Paper, Shotgun"
              leftIcon={<Description />}
            />
          ]}
        />
        <ListItem
          primaryText="World News"
          leftIcon={<Public />}
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="CNN"
              leftIcon={<Description />}
            />,
            <ListItem
              key={2}
              primaryText="BBC"
              leftIcon={<Description />}
            />,
            <ListItem
              key={3}
              primaryText="NY Times"
              leftIcon={<Description />}
            />
          ]}
        />
      </List>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    open: state.open
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchToggle : function(item) {
      dispatch(toggleListItem(item))
    }
  }
};
export  const Unwrapped = Sidebar;
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
