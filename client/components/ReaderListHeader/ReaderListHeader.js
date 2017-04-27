import React from 'react';

import './ReaderListHeader.css';
import { connect } from 'react-redux';
// import { toggleListItem } from '../../actions'

const ReaderListHeader = (props) => {
  return (
    <div className="header-container">
      <h1 className="header-title">FeedPile News</h1>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    // open: state.open
  }
};

export const Unwrapped = ReaderListHeader;
export default connect(mapStateToProps)(ReaderListHeader);
// export default connect(mapStateToProps, {
//   dispatchToggle : toggleListItem, getArticlesFromDb
// })(Sidebar);
