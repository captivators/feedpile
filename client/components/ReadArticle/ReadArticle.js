import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import './ReadArticle.css';

const ReadArticle = (props) => {
  return (
    <div >
      <Link to="/"><button>back</button></Link>
      <h1>In ReadArticle</h1>
    </div>
  )
};
//
// const mapStateToProps = (state) => {
//   return {
//     articles: state.articles
//   }
// };
//
// export const Unwrapped  = ReaderList;
// export default connect(mapStateToProps)(ReaderList);
export default ReadArticle;
