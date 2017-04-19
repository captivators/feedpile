import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import './Main.css'

const Main = (props) => {
  return (
    <div className="main-container" style={{backgroundColor: "#00BCD4"}}>
    <div className="tagline-container">
        <h1 className="tagline">Simply a refreshing way to read the news</h1>
      </div>
      <div className="main" >
        <img className="main-image" src="https://s13.postimg.org/8y3id7gjr/book-logo-main.png"/>
      </div>
      <h1 className="main-h1">Feedpile</h1>
    </div>
  )
}

export default Main;
