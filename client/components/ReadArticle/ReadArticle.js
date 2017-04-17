import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import './ReadArticle.css';

const ReadArticle = (props) => {
  return (
    <div >
      <Link to="/app"><button>back</button></Link>
      <p><b>Selected article's description</b> {props.selectedArticle.description}</p>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    selectedArticle: state.articles[state.currentArticleIndex]
  }
};

export default connect(mapStateToProps)(ReadArticle);
