import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ListIcon from 'material-ui-icons/List';
import LaptopMac from 'material-ui-icons/LaptopMac';
import Star from 'material-ui-icons/Star';
import Games from 'material-ui-icons/Games';
import MusicNote from 'material-ui-icons/MusicNote';
import Public from 'material-ui-icons/Public';
import Refresh from 'material-ui-icons/Refresh';
import Archive from 'material-ui-icons/Archive';
import IconButton from 'material-ui/IconButton';
import Description from 'material-ui-icons/Description';

import './Sidebar.css';
import { getArticlesFromDb } from '../../actions';
import store from '../../store';
import { connect } from 'react-redux';
import { toggleListItem } from '../../actions'

const styles = {
  smallIcon: {
    width: 36,
    height: 36

  },
  small: {
    width: 72,
    height: 72,
    padding: 16
  }
}

const handleRefresh = () => {
  store.dispatch(getArticlesFromDb());
}

const Sidebar = (props) => {
  return (
    <div className="sidebar-container">
      <img className="sidebar-logo" src={"https://s3-us-west-1.amazonaws.com/thesis.feedpile.images/feedpile.png"} />
      <h2 className="logo-name">FeedPile</h2>
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
      <span className="refresh-icon">
        <IconButton onClick={handleRefresh} iconStyle={styles.smallIcon} style={styles.small}>
          <Refresh />
        </IconButton>
      </span>
      <span className="archive-icon">
        <IconButton iconStyle={styles.smallIcon} style={styles.small}>
          <Archive />
        </IconButton>
      </span>
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
export const Unwrapped = Sidebar;
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
