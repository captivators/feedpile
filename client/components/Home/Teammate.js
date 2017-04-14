import React from 'react';

const style = {
  gridList: {
    display: 'flex',
    width: '25%',
    overflowY: 'auto',
    marginBottom: '24px',
    textAlign: 'center',
  },
  porthole: {
    borderRadius: '100%',
    width: '75%',
    maxWidth: '200px',
    margin: '15px auto',
    display: 'block',
  }
}

const Teammate = (props) => {
  console.log('props', props)
  return (
    <div className="team-mate" style={style.gridList}>
      <img src={ props.info.image } style={style.porthole}/>
      { props.info.name }, <br />
      { props.info.job } <br />
    </div>
    )
}

export default Teammate;
