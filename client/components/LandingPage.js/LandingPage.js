import React from 'react';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Landing extends React.Component {
  render() {
    return (
      <div className="mui-container">
        <table width="100%">
          <tr className="mui--appbar-height">
            <td className="mui--text-title">FeedPile.io</td>
            <td align="right">
              <div><Link to="/about">About</Link></div>
            </td>
          </tr>
        </table>
      </div>
      )
  }

}


