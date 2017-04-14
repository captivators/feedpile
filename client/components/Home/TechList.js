import React from 'react';
import TechItem from './TechItem';


const style = {
  logoList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
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


const techList = [
  {
    link: 'http://redux.js.org/',
    image: './images/redux.png'
  },
  {
    link: "http://redux.js.org/",
    image: "./images/webpack.png"
  },
  {
    link: "http://nodejs.org/eng",
    image: ""
  }
]

const TechList = (props) => {
  return (
    <div>
      <div style={style.first}>
        <h2>The Tech </h2>
      </div>
      <div className="stack" style={style.logoList}>
        {techList.map((tech, index) => (
          <TechItem tech= { tech } key={ index } />
        ))}
      </div>
    </div>
  )
}

export default TechList;