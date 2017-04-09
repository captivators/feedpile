import React from 'react';
import SidebarAll from '../SidebarAll/SidebarAll';

const Sidebar = () => {
  return (
    <div className="pure-u-1-4">
      <aside style={{ border: '1px solid blue', height: '100%' }}>
        <SidebarAll />
      </aside>
    </div>
  )
}

export default Sidebar;
