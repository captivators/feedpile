import React from 'react';

const style = {
  first: {
    paddingTop: '45px',
    paddingBottom: '45px',
    width: '100%',
    height: '500px',
    textAlign: 'center',
    border: '1px solid black',
    h1: {
      color: '#fff',
      marginTop: 0,
      fontSize: '48px',
    }
  }
}

const Main = (props) => {
  return (
    <div className="container login center-align" style={style.first}>
      <div className="main">
        <i className="feedpile-logo"></i>
        <a href="#" className="brand-logo center"><img src="./images/feedpile.png"/></a>
        <h1>Feedpile</h1>

        <ul><li><button>Sign up</button></li></ul>
      </div>
    </div>
  )
}

export default Main;
