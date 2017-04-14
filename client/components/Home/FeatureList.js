import React from 'react';
import Feature from './Feature'

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
    },
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
}

const featureList = [
  {
    name: 'RSS',
    featureName: 'Seamless updates',
    description: 'Receive the newest articles instantaneously'
  },
  {
    name: 'News',
    featureName: 'Access to any feed',
    description: 'Unlimited resources all at your fingertips'
  }
]

const FeatureList = (props) => {
  console.log(props)
  return (
    <div style={style.first}>
      <h2>Features</h2>
      <div className="team" style={style.root}>
        {featureList.map((feature, index) => (
          <Feature info={ feature } key={ index } />
        ))}
      </div>
    </div>
    )
}

export default FeatureList;