import React from 'react';
const style = {
  first: {
    paddingTop: '45px',
    paddingBottom: '45px',
    border: '1px solid blue',
    boxSizing: 'border-box',
    width: '100%',
    height: '200px',
    textAlign: 'center',
    h1: {
      color: '#fff',
      marginTop: 0,
      fontSize: '48px',
    }
  }
}

const Feature = (props) => {
  console.log('props', props)
  return (
    <div style={style.first}>
      <i className="large material-icon splash-icons"></i>
      <h5>{props.info.featureName}</h5>
      <p>{props.info.description}</p>
    </div>
    )
}

export default Feature;