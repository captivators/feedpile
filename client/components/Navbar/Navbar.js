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
            // <Avatar src={props.profile.picture} />
            <Avatar src={"https://scontent.fphl2-1.fna.fbcdn.net/v/t1.0-9/17759828_10154626070208565_1493812434276669037_n.jpg?oh=a066ef49d0edf3e1d702fb3821659dfe&oe=599379CF"} />
          }
        >
          <span>Welcome, Darin</span>
          {/* <span>Welcome, {props.profile.given_name || props.profile.name}</span> */}
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
