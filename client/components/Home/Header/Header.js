import React from 'react';
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux';
import { findCreateUser, loginError, setDisplayProgress} from '../../../actions'
import Auth0Lock from 'auth0-lock';

import './Header.css';

const Header = React.createClass({

  componentDidMount() {
    this.lock = new Auth0Lock(process.env.AUTH_ID, process.env.AUTH_DOMAIN);
    this.lock.on("authenticated", function(authResult) {
      this.props.setDisplayProgress(true);
      this.lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          this.props.loginError();
          return;
        }
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        this.props.findCreateUser(profile.identities[0].user_id);
      }.bind(this));
    }.bind(this));
  },

  componentWillReceiveProps() {
      this.props.history.push(`/app`);
  },
  render() {
    return (
        <div className="header">
          <AppBar style={{backgroundColor: '#607D8B'}}
                  title="Feedpile"
                  showMenuIconButton={false}
                  iconElementRight={<FlatButton onClick={()=> this.lock.show()} label="Sign in / Sign up"/>}
          />
        </div>
    )
  }
});

const mapStateToProps = (state) => {
  return {
    redirect: state.redirect
  }
}

export const Unwrapped = Header;
export default connect(mapStateToProps, {findCreateUser, loginError, setDisplayProgress})(Header);
