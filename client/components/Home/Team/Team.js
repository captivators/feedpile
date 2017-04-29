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
    job: <span><a style={{"color":"#4682b4"}} href="https://www.linkedin.com/in/faizulmohammed" target="_blank">LinkedIn</a> | <a style={{"color":"#4682b4"}} href="https://www.github.com/faiz121" target="_blank">Github</a></span>,
    image: 'https://s15.postimg.org/mnsiyo6ob/19718788.png'
  },
  {
    name: 'Mohammad Farooqi',
    job: <span><a style={{"color":"#4682b4"}} href="https://www.linkedin.com/in/mohammadfarooqi" target="_blank">LinkedIn</a> | <a style={{"color":"#4682b4"}} href="https://www.github.com/mohammadfarooqi" target="_blank">Github</a></span>,
    image: 'https://s21.postimg.org/l5w02gp7r/10905290.png'
  },
  {
    name: 'Alex Rosenthal',
    job: <span><a style={{"color":"#4682b4"}} href="https://www.linkedin.com/in/xanrosenthal" target="_blank">LinkedIn</a> | <a style={{"color":"#4682b4"}} href="https://www.github.com/PantherHawk" target="_blank">Github</a></span>,
    image: 'https://s18.postimg.org/g99jey3nd/22188424.jpg'
  },
  {
    name: 'Darin Allen',
    job: <span><a style={{"color":"#4682b4"}} href="https://www.linkedin.com/in/darinallen" target="_blank">LinkedIn</a> | <a style={{"color":"#4682b4"}} href="https://www.github.com/darinallen" target="_blank">Github</a></span>,
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
