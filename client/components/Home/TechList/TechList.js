import React from 'react';
import TechItem from '../TechItem/TechItem';

const style = {
  logoList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    flexWrap: 'wrap',
    backgroundColor: '#78909C',
    padding: '40px',
  }
}


const techList = [
  {
    name: "React",
    link: "https://facebook.github.io/react/",
    image: "https://s27.postimg.org/ud14uv8v7/logo-578x270.png"
  },
  {
    name: "React Router",
    link: "https://react-router.js.org",
    image: "https://s18.postimg.org/7c5q3p115/react-router-logo-_AB5_BFB638_F-seeklogo.com.png"
  },
  {
    name: "Redux",
    link: 'http://redux.js.org/',
    image: "https://s30.postimg.org/50zpvkri9/logo-redux.png"
  },
  {
    name: "Webpack",
    link: "https://www.webpack.js.org/",
    image: "https://s15.postimg.org/p04co7pej/webpack.png",
  },
  {
    name: "Babel",
    link: "http://www.babeljs.io/",
    image: "https://s28.postimg.org/59tbpai4t/babel_1.png"
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
    name: "MongoDB",
    link: "https://www.mongodb.com",
    image: "https://s24.postimg.org/hx7jao6qd/mongodb-logo-1.png",
  },
  {
    name: "Travis CI",
    link: "https://travis-ci.org",
    image: "https://s23.postimg.org/n1i0g8re3/Travis_CI-_Mascot-1-20feeadb48fc2492ba741d89cb5a5c.png"
  },
  {
    name: "Docker",
    link: "https://www.docker.com/what-docker",
    image: "https://s23.postimg.org/iqwvdr6mz/docker.png",
  },
  {
    name: "AWS",
    link: "https://aws.amazon.com/codedeploy/",
    image: "https://s15.postimg.org/c0rtqswi3/Amazon_Webservices_Logo.svg.png",
  },
  {
    name: "Jest",
    link: '',
    image: "https://s24.postimg.org/rgds3co7p/jest.9ec4c2ad.png"
  },
  {
    name: "Enzyme",
    link: "http://airbnb.io/enzyme/docs/api/",
    image: "https://s7.postimg.org/p125vwx4r/1-pu9_U8_EYL3_KGrgvapyp1p_Sg.png"
  },
  {
    name: "Mocha Chai",
    link: "http://chaijs.com/",
    image: "https://s9.postimg.org/q5c35f0zj/chaijs-mocha.png"
  },
  {
    name: "Material UI",
    link: "http://www.material-ui.com/#/customization/themes",
    image: "https://s11.postimg.org/975jiaz8j/material-ui_1.png"
  },
  {
    name: "NPM",
    link: "https://www.npmjs.com/",
    image: "https://s14.postimg.org/nhna7dump/npm.png"
  }
]

const TechList = (props) => {
  return (
    <div className="stack" style={style.logoList}>
      {techList.map((tech, index) => (
        <TechItem tech= { tech } key={ index } />
      ))}
    </div>
  )
}

export default TechList;
