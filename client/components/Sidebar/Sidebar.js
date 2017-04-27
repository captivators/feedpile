import React, {Component} from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import PropTypes from 'prop-types';
import AddFeed from '../AddFeed/AddFeed'
import ListIcon from 'material-ui-icons/List';
import WorldNews from 'material-ui-icons/Public';
import Technology from 'material-ui-icons/LaptopMac';
import Politics from 'material-ui-icons/AccountBalance';
import Business from 'material-ui-icons/Business';
import Money from 'material-ui-icons/AttachMoney';
import Sports from 'material-ui-icons/DirectionsBike';
import Entertainment from 'material-ui-icons/Theaters';
import Music from 'material-ui-icons/MusicNote';
import Games from 'material-ui-icons/Games';
import Food from 'material-ui-icons/LocalDining';
import Travel from 'material-ui-icons/FlightTakeoff';
import Other from 'material-ui-icons/ChromeReaderMode';
import Refresh from 'material-ui-icons/Refresh';
import Delete from 'material-ui-icons/Delete';
import AddCircle from 'material-ui-icons/AddCircle';
import IconButton from 'material-ui/IconButton';
import Description from 'material-ui-icons/Description';
import PanoramaFishEye from 'material-ui-icons/PanoramaFishEye';
import FlatButton from 'material-ui/FlatButton';
import DeleteFeed from '../DeleteFeed/DeleteFeed';

import feedPileImg from '../../images/feedpile.png';

import './Sidebar.css';
import { fetchArticlesForFeedsFromDb, toggleModal, toggleDeleteModal,
findCreateUser, setSidebarFeed, setDisplayProgress, setCurrentFeedTitle } from '../../actions';
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

const icons = {
  "World News": <WorldNews />,
  "Technology": <Technology />,
  "Politics": <Politics />,
  "Business": <Business />,
  "Money": <Money />,
  "Sports": <Sports />,
  "Entertainment": <Entertainment />,
  "Music": <Music />,
  "Games": <Games />,
  "Food": <Food />,
  "Travel": <Travel />,
  "Other": <Other />
}



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
                      onClick={() => {
                        this.props.setCurrentFeedTitle('All Articles');
                        this.props.setSidebarFeed("");}
                      }
            />
            {categories.map((categoryId, index) => {
              return (<ListItem value={index+4} key={index+4} primaryText={this.props.user[categoryId].categoryName}
                        leftIcon={icons[this.props.user[categoryId].categoryName]} primaryTogglesNestedList={true} initiallyOpen={false}
                                nestedItems=
                                  {this.props.user[categoryId].feeds.map((feed, i) => {
                                    return (<ListItem
                                        value={Math.random() * 20}
                                        key={i}
                                        primaryText={feed.name}
                                        onClick={() => {
                                          this.props.setCurrentFeedTitle(feed.name);
                                          this.props.setSidebarFeed(feed.feedId);}
                                        }
                                        leftIcon={<Description/>}
                                        // {this.prop.deleteButton && rightIcon={<PanoramaFishEye/>}}
                                    />)
                                  })}
                        />)
            })}
          </SelectableList>

      <span className="refresh-icon">
        <IconButton onClick={()=>{
          this.props.fetchArticlesForFeedsFromDb()
          this.props.setDisplayProgress(true)
        }
        } className="refresh-icon" iconStyle={styles.smallIcon}
                    style={styles.small}>
          <Refresh />
        </IconButton>
      </span>
      <span className="add-icon">
        <IconButton onClick={() => {
          this.props.toggleModal(true)
        }} iconStyle={styles.smallIcon} className="add-icon" style={styles.small}>
          <AddCircle />
        </IconButton>
      </span>
          <span className="delete-icon">
        <IconButton onClick={() => {
            this.props.toggleDeleteModal(true)
        }}iconStyle={styles.smallIcon} className="delete-icon" style={styles.small}>
          <Delete />
        </IconButton>
      </span>
          <AddFeed />
          <DeleteFeed />
        </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    open: state.open,
    user: state.user,
    categories: state.categories
  }
};

export const Unwrapped = Sidebar;

export default connect(mapStateToProps, {
  fetchArticlesForFeedsFromDb, toggleModal,
  findCreateUser, setSidebarFeed, setDisplayProgress,
    toggleDeleteModal, setCurrentFeedTitle
})(Sidebar);
