import React from 'react';

const style = {
  logos: {
    width: '50%',
    maxWidth: '150px',
    margin: 'auto',
    padding: '20px'
  }
}

const TechItem = (props) => {
  return (
    <div style={style.logos}>
      <a className="tech-logo" href={ props.tech.link }><img src={ props.tech.image }/></a>
    </div>
  )
}

export default TechItem;
