import React from 'react';
import Teammate from './Teammate'

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

const teamInfo = [
  {
    name: 'Faiz Mohammad',
    job: 'Senior Software Engineer'
  },
  {
    name: 'Mohammad Farooqi',
    job: 'Senior Software Engineer'
  },
  {
    name: 'Alex Rosenthal',
    job: 'Scrum Master, Software Engineer'
  },
  {
    name: 'Darin Allen',
    job: 'Product Owner, Software Engineer'
  }
]

const Team = (props) => {
  return (
    <div>
      <div style={style.first}>
      <h2>The Team</h2>
        <div className="team" style={style.root}>
          {teamInfo.map((teamMate, index) => (
            <Teammate info={ teamMate } key={ index } />
          ))}
        </div>
      </div>
    </div>
    )
}

export default Team;