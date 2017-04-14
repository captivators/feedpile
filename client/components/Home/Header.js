import React from 'react';

const style = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
}

const Header = (props) => {
  return (
    <div>
      <ul className="navigation" style={style.root}>
        <li>Feedpile</li>
        <li><a href="#">Sign in</a></li>
      </ul>
    </div>
  )
}

export default Header;