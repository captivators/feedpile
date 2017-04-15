import React from 'react';
import { connect } from 'react-redux';
import './ReadArticle.css';

const ReadArticle = (props) => {
  return (
    <div className="reader-list-container">
      {props.articles.map((article, index) => (
        <ReaderListItem article={article} key={index}/>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles
  }
};

export const Unwrapped  = ReadArticle;
export default connect(mapStateToProps)(ReadArticle);
