import React from 'react';
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
const style = {margin: 5};
const Navbar = (props) => {
  return (
    <div className="navbar">
      <div className="nav-item-container">
        <button onClick={()=> {
          logout();
          props.logoutSuccess();
          props.history.replace('/');
        }}
                className="logout">Logout</button>
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

  /*

   <List>
   <ListItem
   leftAvatar={
   <Avatar
   src={props.profile.picture}
   size={50}
   style={style}
   />
   }
   >
   </ListItem>
   <span>Welcome, {props.profile.given_name || props.profile.name}</span>
   <FlatButton onClick={()=> {
   logout();
   props.logoutSuccess();
   props.history.replace('/');
   }} label="Logout"/>
   </List>
   */
