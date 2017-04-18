import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-item-container">
        <FlatButton label="Logout" />
      </div>
    </div>
  )
}

export default Navbar;
