import React from 'react';
import TechItem from './TechItem';


const style = {
  logoList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    border: '1px solid grey',
    height: '200px',
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
    image: "https://s30.postimg.org/50zpvkri9/logo-redux.png"
  },
  {
    link: "http://www.babeljs.io/",
    image: "https://s30.postimg.org/z92z4actt/babel.png"
  },
  {
    link: "http://nodejs.org/eng",
    image: "https://s1.postimg.org/400bfw3vj/nodejs.png"
  },
  {
    image: "https://s7.postimg.org/c5kgs8wh7/express.png",
    link: "https://expressjs.com"
  },
  {
    name: "Module Bundler",
    link: "https://www.webpack.js.org/",
    image: "https://s15.postimg.org/p04co7pej/webpack.png",
    description: "Built in dev-server with live reload"
  },
  {
    name: "MongoDB",
    link: "https://www.mongodb.com",
    image: "https://s23.postimg.org/6zm6jjb7f/mongodb-logo-rgb-j6w271g1xn.jpg",
    description: "More-than-SQL Database"
  },
  {
    name: "Travis CI",
    link: "https://travis-ci.org",
    image: "https://s23.postimg.org/n1i0g8re3/Travis_CI-_Mascot-1-20feeadb48fc2492ba741d89cb5a5c.png",
    description: "Continuous Integration"
  },
  {
    link: "https://facebook.github.io/react/",
    image: "https://s27.postimg.org/ud14uv8v7/logo-578x270.png"
  },
  {
    link: "https://react-router.js.org",
    image: "https://s30.postimg.org/86yfbsgvl/react-router.png"
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