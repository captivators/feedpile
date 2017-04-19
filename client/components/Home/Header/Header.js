import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux';
import { loginSuccess, loginError} from '../../../actions'
import Auth0Lock from 'auth0-lock';
const style = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
};

const Header = React.createClass({

  componentDidMount() {
    this.lock = new Auth0Lock('V22h9G3v-_1RucHOwP71LqZpQJCSiL6n', 'faizone.auth0.com');
    this.lock.on("authenticated", function(authResult) {
      this.lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          this.props.loginError();
          return;
        }
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        this.props.loginSuccess(localStorage.getItem('profile'));
        this.props.history.push(`/app`);
      }.bind(this));
    }.bind(this));
  },
  render() {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <AppBar style={style.root}
                  title="Feedpile"
                  iconElementRight={<FlatButton onClick={()=> this.lock.show()} label="Sign in / Sign up"/>}
          />
        </MuiThemeProvider>
    )
  }
});

export default connect(null, {loginSuccess, loginError})(Header);
