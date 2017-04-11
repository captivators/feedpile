import React from 'react';
import SidebarAll from '../SidebarAll/SidebarAll';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <img className="sidebar-logo" src={"https://s3-us-west-1.amazonaws.com/thesis.feedpile.images/feedpile.png"} />
      <h2 className="logo-name">Feedpile</h2>
      <SidebarAll />
    </div>
  )
}

export default Sidebar;
