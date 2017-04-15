import React from 'react';

const style = {
  gridList: {
    width: '25%',
    overflowY: 'hidden',
    marginBottom: '24px',
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'center',
  },
  porthole: {
    borderRadius: '100%',
    width: '75%',
    maxWidth: '100px',
    margin: '15px auto',
    imageAlign: 'center'
  }
}

const Teammate = (props) => {
  return (
    <div className="team-mate" style={style.gridList}>
      <img src={ props.info.image } style={style.porthole} alt=""/><br/>
      { props.info.name } <br />
      { props.info.job } <br />
    </div>
    )
}

export default Teammate;