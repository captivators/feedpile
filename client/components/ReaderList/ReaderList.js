import React from 'react';
import ReaderListItem from '../ReaderListItem/ReaderListItem';
import { connect } from 'react-redux';
import './ReaderList.css';

const ReaderList = (props) => {
  return (
    <div className="reader-list-container">
      <div className="position-container">
        {props.articles.map((article, index) => (
          <ReaderListItem article={article} key={index}/>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles
  }
};

export const Unwrapped  = ReaderList;
export default connect(mapStateToProps)(ReaderList);
