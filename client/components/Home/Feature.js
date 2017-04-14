import React from 'react';
const style = {
  first: {
    paddingTop: '45px',
    paddingBottom: '45px',
    width: '100%',
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