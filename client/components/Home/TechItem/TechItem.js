import React from 'react';

const style = {
  logos: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: '100px',
    maxHeight: '150px',
    margin: '2px 5px'
  },
   gridList: {
    width: '20%',
    overflowY: 'hidden',
    textAlign: 'center'
  }
}

const TechItem = (props) => {
  return (
    <div style={style.gridList}>
    <a style={style.logos} href={ props.tech.link }><img src={ props.tech.image }/></a>
    <br />
    { props.tech.description }
    </div>
  )
}

export default TechItem;
