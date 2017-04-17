import React from 'react';
import Feature from '../Feature/Feature'
import Amber from 'material-ui/styles/colors'
import './FeatureList.css'

const featureList = [
  {
    name: 'RSS',
    featureName: 'Seamless updates',
    description: 'Receive the newest articles instantaneously',
    color: "Amber"
  },
  {
    name: 'News',
    featureName: 'Access to any feed',
    description: 'Unlimited resources all at your fingertips',
    color: "Carrot"
  }
]

const FeatureList = (props) => {
  console.log(props)
  return (
    <div className="features">
    <ul>
    <li><h2 className="h3">Features</h2></li>
      <li><div className="team" >
        {featureList.map((feature, index) => (
          <Feature info={ feature } key={ index } />
        ))}
      </div></li>
      </ul>
    </div>
    )
}

export default FeatureList;