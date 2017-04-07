import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <div><Link to="/">Home</Link></div>
        <div><Link to="/about">About</Link></div>
        <hr />
        <h1>
          404 <small>Not Found :(</small>
        </h1>
      </div>
    );
  }
}

export default NotFound;