import React from 'react';
// import SidebarAll from '../SidebarAll/SidebarAll';
import {List, ListItem} from 'material-ui/List';
import Inbox from 'material-ui/svg-icons/content/inbox/';
// import ContentInbox from 'material-ui-icons/';
import './Sidebar.css';
import { connect } from 'react-redux';
import { toggleListItem } from '../../actions'

const Sidebar = (props) => {
  return (
    <div className="sidebar-container">
      <img className="sidebar-logo" src={"https://s3-us-west-1.amazonaws.com/thesis.feedpile.images/feedpile.png"} />
      <h2 className="logo-name">Feedpile</h2>
      {/* <SidebarAll /> */}
      <List>
        <ListItem primaryText="Sent mail" leftIcon={<Inbox />} />
        <ListItem primaryText="Drafts" leftIcon={<Inbox />} />
        <ListItem
          primaryText="Inbox"
          leftIcon={<Inbox />}
          initiallyOpen={true}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              key={1}
              primaryText="Starred"
              leftIcon={<Inbox />}
            />,
            <ListItem
              key={2}
              primaryText="Sent Mail"
              leftIcon={<Inbox />}
              disabled={true}
              nestedItems={[
                <ListItem key={1} primaryText="Drafts" leftIcon={<Inbox />} />,
              ]}
            />,
            <ListItem
              key={3}
              primaryText="Inbox"
              leftIcon={<Inbox />}
              open={props.open}
              onNestedListToggle={props.dispatchToggle}
              nestedItems={[
                <ListItem key={1} primaryText="Drafts" leftIcon={<Inbox />} />,
              ]}
            />,
          ]}
        />
      </List>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    open: state.open
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchToggle(item) {
      dispatch(toggleListItem(item))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
// export default Sidebar;
