import React from 'react';

const style = {
  logos: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    boxSizing: 'border-box',
    alignItems: 'center',
    width: '50%',
    maxWidth: '150px',
    margin: 'auto'
  },
   gridList: {
    width: '18%',
    overflowY: 'hidden',
    textAlign: 'center',

  }
}

const TechItem = (props) => {
  return (
    <a style={style.logos} href={ props.tech.link }><img src={ props.tech.image }/></a>
  )
}

export default TechItem;
