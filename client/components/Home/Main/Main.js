import React from 'react';
import Card from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import './Main.css'

const Main = (props) => {
  return (
    <div className="main-container" style={{backgroundColor: "#304FFE"}}>
    <Card className="main-card" zDepth={0} style={{backgroundColor: "#304FFE"}}>
      <div className="main" >
        <i className="feedpile-logo"></i>
        <a href="#" className="brand-logo center"><img className="main-image" src="https://s13.postimg.org/8y3id7gjr/book-logo-main.png"/></a>
        <ul>
          <li><h1 className="main-h1">Feedpile</h1></li>
          <br/>

          <li><RaisedButton
          label="Get Started"
          primary={true}
          className="sign-up"/></li>
        </ul>
      </div>
      </Card>
    </div>
  )
}

export default Main;
