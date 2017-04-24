import React from 'react';
import './ReaderListItem.css';
import {connect} from 'react-redux';
import {setCurrentArticle} from '../../actions'

const ReaderListItem = (props) => {
  const {title, imageSrc, publisher, summary, description} = props.article;

  return(
      <div onClick={() => {
        props.history.push(`/read/${props.article._id}`)
        props.renderReadView(props.article)
      }}>
      <div className='list-item-container'>
        <div className='thumbnail-container'>
          <img className='thumbnail-image' src={imageSrc ? imageSrc:'https://s15.postimg.org/6jredm53v/news.png'}/>
        </div>
        <div className='article-text-container'>
          <h2 className='article-title'>{title}</h2>
          <p className='article-publisher'>{publisher}</p>
          <p className='article-summary'>{summary}</p>
        </div>
      </div>
    </div>
  )
};


export const Unwrapped = ReaderListItem;
export default connect(null, {renderReadView: setCurrentArticle})(ReaderListItem);
