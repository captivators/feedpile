import React from 'react';

import './ReaderListHeader.css';
import { connect } from 'react-redux';

const ReaderListHeader = (props) => {
  return (
    <div className="header-container">
      <h1 className="header-title">{props.currentFeedTitle}</h1>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    currentFeedTitle: state.currentFeedTitle
  }
};

export const Unwrapped = ReaderListHeader;
export default connect(mapStateToProps)(ReaderListHeader);
// export default connect(mapStateToProps, {
//   dispatchToggle : toggleListItem, getArticlesFromDb
// })(Sidebar);
