import React from 'react';
import TechItem from '../TechItem/TechItem';


const style = {
  logoList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
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
    name: "Redux",
    link: 'http://redux.js.org/',
    image: "https://s30.postimg.org/50zpvkri9/logo-redux.png"
  },
  {
    name: "Babel",
    link: "http://www.babeljs.io/",
    image: "https://s30.postimg.org/z92z4actt/babel.png"
  },
  {
    name: "Node",
    link: "http://nodejs.org/eng",
    image: "https://s1.postimg.org/400bfw3vj/nodejs.png"
  },
  {
    name: "Express",
    image: "https://s7.postimg.org/c5kgs8wh7/express.png",
    link: "https://expressjs.com"
  },
  {
    name: "Webpack",
    link: "https://www.webpack.js.org/",
    image: "https://s15.postimg.org/p04co7pej/webpack.png",
  },
  {
    name: "MongoDB",
    link: "https://www.mongodb.com",
    image: "https://s23.postimg.org/6zm6jjb7f/mongodb-logo-rgb-j6w271g1xn.jpg",
  },
  {
    name: "Travis CI",
    link: "https://travis-ci.org",
    image: "https://s23.postimg.org/n1i0g8re3/Travis_CI-_Mascot-1-20feeadb48fc2492ba741d89cb5a5c.png"
  },
  {
    name: "React",
    link: "https://facebook.github.io/react/",
    image: "https://s27.postimg.org/ud14uv8v7/logo-578x270.png"
  },
  {
    name: "React Router",
    link: "https://react-router.js.org",
    image: "https://s11.postimg.org/9ewo3bnmr/react-router.png"
  },
  {
    name: "Docker",
    link: "https://www.docker.com",
    image: "https://s4.postimg.org/l4sfu2sql/docker.png"
  },
  {
    name: "Enzyme",
    link: "http://airbnb.io/enzyme/docs/api/",
    image: "https://s7.postimg.org/p125vwx4r/1-pu9_U8_EYL3_KGrgvapyp1p_Sg.png"
  },
  {
    name: "Material UI",
    link: "http://www.material-ui.com/#/customization/themes",
    image: "https://s11.postimg.org/975jiaz8j/material-ui_1.png"
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