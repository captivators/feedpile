import React from 'react';
import ReaderBar from '../ReaderBar/ReaderBar';
import ReaderListItem from '../ReaderListItem/ReaderListItem';
import { connect } from 'react-redux';

const ReaderList = (props) => {
  return (
    <div className="pure-u-3-4">
      <ReaderBar />
      {props.articles.map((article, index) => (
        <ReaderListItem article={article} key={index}/>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(`in mapStatetoProps ${JSON.stringify(state)}`);
  return {
    articles: state.articles
  }
};

export default connect(mapStateToProps)(ReaderList);
