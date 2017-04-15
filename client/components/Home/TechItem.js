import React from 'react';

const style = {
  logos: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: '150px',
    maxHeight: '150px',
    margin: '2px 10px'
  },
   gridList: {
    width: '25%',
    overflowY: 'auto',
    marginBottom: '24px',
    textAlign: 'center'
  }
}

const TechItem = (props) => {
  return (
    <div style={style.gridList}>
    <a style={style.logos} href={ props.tech.link }><img src={ props.tech.image }/></a>
    <br/>
    { props.tech.name }
    <br />
    { props.tech.description }
    </div>
  )
}

export default TechItem;
