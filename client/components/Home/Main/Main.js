import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'

const style = {
  first: {
    paddingTop: '45px',
    paddingBottom: '45px',
    width: '100%',
    backgroundColor: '#f2f2f2',
    height: '500px',
    textAlign: 'center',
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
        <a href="#" className="brand-logo center"><img src="https://s3-us-west-1.amazonaws.com/thesis.feedpile.images/feedpile.png"/></a>
        <h1>Feedpile</h1>

        <RaisedButton label="Get Started" />
      </div>
    </div>
  )
}

export default Main;
