import React from 'react';
import ReaderListHeader from '../ReaderListHeader/ReaderListHeader'
import ReaderListItem from '../ReaderListItem/ReaderListItem';
import Welcome from '../Welcome/Welcome';
import {connect} from 'react-redux';
import './ReaderList.css';
import articlesSelector  from '../../selectors/articles-selector';
import {fetchArticlesForFeedsFromDb} from '../../actions'

class ReaderList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchArticlesForFeedsFromDb();
  }

  render() {
    return (
        <div className="reader-list-container">
          {this.props.showWelcome ? (<Welcome />) : (<ReaderListHeader />)}
          {this.props.articlesFound.map((article, index) => (
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
    articlesFound: articlesSelector(state),
    showWelcome: state.showWelcome
  }
};

export const Unwrapped = ReaderList;
export default connect(mapStateToProps, {fetchArticlesForFeedsFromDb})(ReaderList);
