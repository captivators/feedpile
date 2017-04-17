import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify';
import './ReadArticle.css';

const ReadArticle = (props) => {
  return (
    <div >
      <Link to="/app"><button>back</button></Link>
      <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.selectedArticle.description)}}></div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    selectedArticle: state.articles[state.currentArticleIndex]
  }
};

export default connect(mapStateToProps)(ReadArticle);
