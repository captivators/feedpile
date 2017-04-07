import React from 'react';
import { Link } from 'react-router-dom';

class About extends React.Component {
  render() {
    return (
      <div>
        <div><Link to="/">Home</Link></div>
        <div><Link to="/missing">Not Working</Link></div>
        <hr />
        <h1>
          About Page
        </h1>
      </div>
    );
  }
}

export default About;