import React from 'react';
import ReaderListItem from '../ReaderListItem/ReaderListItem';
import {connect} from 'react-redux';
import { getArticlesFromDb } from '../../actions';
import './ReaderList.css';

class ReaderList extends React.Component {
  constructor (props){
    super(props);
  }
  componentDidMount() {
    if(!this.props.articles.length) this.props.getArticlesFromDb();
  }
  render() {
    return (
        <div className="reader-list-container">
          {this.props.articles.map((article, index) => (
              <ReaderListItem history={this.props.history}
                              article={article}
                              key={index}/>
          ))}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles
  }
};

export const Unwrapped = ReaderList;
export default connect(mapStateToProps, {getArticlesFromDb})(ReaderList);
