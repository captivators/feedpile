import React from 'react';
import './ReaderListItem.css';
import DOMPurify from 'dompurify';
import { connect } from 'react-redux';
import {setCurrentArticle} from '../../actions'

const ReaderListItem = (props) => {
const { title, imageSrc, publisher, summary, description } =  props.article;

  return(
    <div onClick= {() => {props.renderReadView(props.article)}}>
      <div className='list-item-container'>
        <div className='thumbnail-container'>
          <img className='thumbnail-image' src={imageSrc}/>
        </div>
        <div className='article-text-container'>
          <h2 className='article-title'>{title}</h2>
          <p className='article-publisher'>{publisher}</p>
          <p className='article-summary'>{summary}</p>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
  renderReadView: function (article) {
    dispatch(setCurrentArticle(article))
    }
  }
}
export default connect(null, mapDispatchToProps )(ReaderListItem);

{/* <p className='article-description' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(summary)}}></p> */}
