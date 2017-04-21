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
import PanoramaFishEye from 'material-ui-icons/PanoramaFishEye';
import Lens from 'material-ui-icons/Lens';

import feedPileImg from '../../images/feedpile.png'

import './Sidebar.css';
import { fetchArticlesForFeedsFromDb, toggleListItem, toggleModal,
findCreateUser, setSidebarFeed } from '../../actions';
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
    // static propTypes = {
    //   children: PropTypes.node.isRequired,
    //   defaultValue: PropTypes.number.isRequired,
    // };

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

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if(Object.keys(this.props.user).length === 0) {
      this.props.findCreateUser(JSON.parse(localStorage.getItem('profile')).identities[0].user_id);
    }
  }
  render() {
    const categories = Object.keys(this.props.user);
    return (
        <div className="sidebar-container">
          <img className="sidebar-logo" src={feedPileImg}/>
          <h2 className="logo-name">FeedPile</h2>
          <SelectableList defaultValue={1}>
            <ListItem value={1} primaryText="All Articles" leftIcon={<ListIcon />}
                      onClick={() => this.props.setSidebarFeed("")}
            />
            <ListItem value={2} primaryText="Starred" leftIcon={<Star />}/>
            {categories.map((categoryId, index) => {
              return (<ListItem value={index+4} key={index+4} primaryText={this.props.user[categoryId].categoryName}

                        leftIcon={<ListIcon />} primaryTogglesNestedList={true} initiallyOpen={false}
                                nestedItems=
                                  {this.props.user[categoryId].feeds.map((feed, i) => {
                                    return (<ListItem
                                        value={Math.random() * 20}
                                        key={i}
                                        primaryText={feed.name}
                                        onClick={() => this.props.setSidebarFeed(feed.feedId)}
                                        leftIcon={<PanoramaFishEye />}
                                    />)
                                  })}
                        />)
            })}
            <ListItem value={3} primaryText="Archived" leftIcon={<Archive />}/>
          </SelectableList>

          <span className="refresh-icon">
        <IconButton onClick={this.props.fetchArticlesForFeedsFromDb} className="refresh-icon" iconStyle={styles.smallIcon}
                    style={styles.small}>
          <Refresh />
        </IconButton>
      </span>
          <span className="archive-icon">
        <IconButton onClick={() => {
          this.props.toggleModal(true)
        }} iconStyle={styles.smallIcon} className="add-icon" style={styles.small}>
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
  }
};

const mapStateToProps = (state) => {
  return {
    open: state.open,
    user: state.user
  }
};

export const Unwrapped = Sidebar;

export default connect(mapStateToProps, {
  dispatchToggle : toggleListItem, fetchArticlesForFeedsFromDb, toggleModal,
  findCreateUser, setSidebarFeed
})(Sidebar);
