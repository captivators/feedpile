import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { toggleModal } from '../../actions';
import { connect } from 'react-redux'
import newspaperImg from '../../images/news.png'
import './Welcome.css';

const Welcome = (props) => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-text">Welcome to FeedPile!</h1>
        <h2 className="welcome-subtext">To get started, just add a feed</h2>
        <img className="newspaper" src={newspaperImg}/>
        <div className="add-btn">
          <RaisedButton onClick={() => {
            props.toggleModal(true)
          }} label="Add Feed" primary={true} />
        </div>
      </div>
    </div>
  );
}

export default connect(null, {toggleModal})(Welcome);
