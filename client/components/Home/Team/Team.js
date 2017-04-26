import React from 'react';
import Teammate from '../Teammate/Teammate'
import './Team.css'

const style = {
  first: {
    paddingTop: '60px',
    paddingBottom: '60px',
    width: '100%',
    textAlign: 'center',
    h1: {
      marginTop: 0,
      fontSize: '48px',
      fontFamily: 'Roboto, sans-serif',
    },
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
}

const teamInfo = [
  {
    name: 'Faiz Mohammad',
    job: 'Software Engineer',
    image: 'https://s15.postimg.org/mnsiyo6ob/19718788.png'
  },
  {
    name: 'Mohammad Farooqi',
    job: 'Software Engineer',
    image: 'https://s21.postimg.org/l5w02gp7r/10905290.png'
  },
  {
    name: 'Alex Rosenthal',
    job: 'Software Engineer',
    image: 'https://s18.postimg.org/g99jey3nd/22188424.jpg'
  },
  {
    name: 'Darin Allen',
    job: 'Product Owner,\n Software Engineer',
    image: 'https://s15.postimg.org/yl8x4qctn/14929585.jpg'
  }
]

const Team = (props) => {
  return (
    <div className="team-container" style={style.first}>
      <div className="team" style={style.root}>
        {teamInfo.map((teamMate, index) => (
          <Teammate info={ teamMate } key={ index } />
        ))}
      </div>
    </div>
    )
}

export default Team;
