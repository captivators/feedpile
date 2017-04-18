import React, {Component} from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import PropTypes from 'prop-types';
import AddFeed from '../AddFeed/AddFeed'
import ListIcon from 'material-ui-icons/List';
import LaptopMac from 'material-ui-icons/LaptopMac';
import Star from 'material-ui-icons/Star';
import Games from 'material-ui-icons/Games';
import MusicNote from 'material-ui-icons/MusicNote';
import Public from 'material-ui-icons/Public';
import Refresh from 'material-ui-icons/Refresh';
import Archive from 'material-ui-icons/Archive';
import AddCircle from 'material-ui-icons/AddCircle';
import IconButton from 'material-ui/IconButton';
import Description from 'material-ui-icons/Description';
import feedPileImg from '../../images/feedpile.png'

import './Sidebar.css';
import { getArticlesFromDb, toggleListItem, toggleModal } from '../../actions';
import { connect } from 'react-redux';

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
};

let SelectableList = makeSelectable(List);


function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);




const Sidebar = (props) => {
  return (
    <div className="sidebar-container">
      <img className="sidebar-logo" src={feedPileImg} />
      <h2 className="logo-name">FeedPile</h2>
      <SelectableList defaultValue={1}>
        <ListItem value={1} primaryText="All Articles" leftIcon={<ListIcon />} />
        <ListItem value={2} primaryText="Starred" leftIcon={<Star />} />
        <ListItem
          value={4}
          primaryText="Technology"
          leftIcon={<LaptopMac />}
          initiallyOpen={props.open}
          onNestedListToggle={props.dispatchToggle}
          primaryTogglesNestedList={false}
          nestedItems={[
            <ListItem
              value={5}
              key={1}
              primaryText="TechCrunch"
              leftIcon={<Description />}
            />,
            <ListItem
              value={6}
              key={2}
              primaryText="The Verge"
              leftIcon={<Description />}
            />,
            <ListItem
              value={7}
              key={3}
              primaryText="WIRED"
              leftIcon={<Description />}
            />
          ]}
        />
        <ListItem
          value={8}
          primaryText="Music"
          leftIcon={<MusicNote />}
          initiallyOpen={false}
          primaryTogglesNestedList={false}
          onNestedListToggle={props.dispatchToggle}
          nestedItems={[
            <ListItem
              value={9}
              key={1}
              primaryText="SPIN"
              leftIcon={<Description />}
            />,
            <ListItem
              value={10}
              key={2}
              primaryText="Rolling Stone"
              leftIcon={<Description />}
            />,
            <ListItem
              value={11}
              key={3}
              primaryText="Pitchfork"
              leftIcon={<Description />}
            />
          ]}
        />
        <ListItem
          value={12}
          primaryText="Games"
          leftIcon={<Games />}
          initiallyOpen={false}
          primaryTogglesNestedList={false}
          onNestedListToggle={props.dispatchToggle}
          nestedItems={[
            <ListItem
              value={13}
              key={1}
              primaryText="IGN"
              leftIcon={<Description />}
            />,
            <ListItem
              value={14}
              key={2}
              primaryText="Gamespot"
              leftIcon={<Description />}
            />,
            <ListItem
              value={15}
              key={3}
              primaryText="Rock, Paper, Shotgun"
              leftIcon={<Description />}
            />
          ]}
        />
        <ListItem
          value={16}
          primaryText="World News"
          leftIcon={<Public />}
          initiallyOpen={false}
          primaryTogglesNestedList={false}
          nestedItems={[
            <ListItem
              value={17}
              key={1}
              primaryText="CNN"
              leftIcon={<Description />}
            />,
            <ListItem
              value={18}
              key={2}
              primaryText="BBC"
              leftIcon={<Description />}
            />,
            <ListItem
              value={19}
              key={3}
              primaryText="NY Times"
              leftIcon={<Description />}
            />
          ]}
        />
        <ListItem value={20} primaryText="Archived" leftIcon={<Archive />} />
      </SelectableList>

      <span className="refresh-icon">
        <IconButton onClick={props.getArticlesFromDb} className="refresh-icon" iconStyle={styles.smallIcon} style={styles.small}>
          <Refresh />
        </IconButton>
      </span>
      <span className="archive-icon">
        <IconButton onClick={() => {props.toggleModal(true)}} iconStyle={styles.smallIcon} className="add-icon" style={styles.small}>
          <AddCircle />
        </IconButton>
      </span>
      <span className="archive-icon">
        <IconButton iconStyle={styles.smallIcon} className="archive-icon" style={styles.small}>
          <Archive />
        </IconButton>
      </span>
      <AddFeed />
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    open: state.open
  }
};

export const Unwrapped = Sidebar;

export default connect(mapStateToProps, {
  dispatchToggle : toggleListItem, getArticlesFromDb, toggleModal
})(Sidebar);
