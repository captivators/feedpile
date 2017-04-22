import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import './Navbar.css';
import { connect } from 'react-redux'
import { logoutSuccess } from '../../actions'
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
const logout = () => {
  localStorage.removeItem('id_token');
  localStorage.removeItem('profile');
};

const Navbar = (props) => {
  return (
    <div className="navbar">
      <div className="greeting">
        <ListItem
          disabled={true}
          leftAvatar={
            <Avatar src={props.profile.picture} />}
        >
           <span>Welcome, {props.profile.given_name || props.profile.name}</span>
        </ListItem>
      </div>
      <div className="logout">
        <FlatButton onClick={()=> {
          logout();
          props.logoutSuccess();
          props.history.replace('/');
        }} label="Logout" />
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
};

export default connect(mapStateToProps, {logoutSuccess})(Navbar);
