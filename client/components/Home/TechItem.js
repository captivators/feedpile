import React from 'react';

const style = {
  logos: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '18%',
    maxWidth: '150px',
    margin: '2px 10px'
  }
}

const TechItem = (props) => {
  return (
    <a style={style.logos} href={ props.tech.link }><img src={ props.tech.image }/></a>
  )
}

export default TechItem;
