import React from 'react';
import './Home.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class Home extends React.Component {

  render() {

    return (
      <div className="mui--splash">
        <nav className="splash-nav blue darken-3">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo center">Feedpile</a>
            <ul className="right"><li><button onClick={console.log('login button clicked')} className="right" className="btn waves-effect waves-light indigo darken-4">Sign in</button></li></ul>
          </div>
        </nav>

        <div className="container login center-align">

          <div className="row">

          </div>
        </div>
      </div>
    );
  }
}

export default Home;
