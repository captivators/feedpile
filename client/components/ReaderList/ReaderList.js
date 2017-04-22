import React from 'react';
import ReaderListHeader from '../ReaderListHeader/ReaderListHeader'
import ReaderListItem from '../ReaderListItem/ReaderListItem';
import {connect} from 'react-redux';
import './ReaderList.css';
import { fetchArticlesForFeedsFromDb } from '../../actions'

class ReaderList extends React.Component {
  constructor (props){
    super(props);
  }
  componentWillMount() {
    this.props.fetchArticlesForFeedsFromDb();
  }
  render() {
    let articlesFound = [];
    if(!Array.isArray(this.props.articles)) {
      if(this.props.currentFeed !== "") {
        articlesFound = this.props.articles[this.props.currentFeed];
      } else {
        for(var key in this.props.articles) {
          articlesFound = articlesFound.concat(this.props.articles[key]);
        }
      }
    }
    return (
        <div className="reader-list-container">
          <ReaderListHeader />
          {articlesFound.map((article, index) => (
              <ReaderListItem history={this.props.history}
                              article={article}
                              key={index} articleIndex={index}
              />
          ))}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
    currentFeed: state.currentFeed
  }
};

export const Unwrapped = ReaderList;
export default connect(mapStateToProps, {fetchArticlesForFeedsFromDb})(ReaderList);
