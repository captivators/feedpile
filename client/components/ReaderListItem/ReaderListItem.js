import React from 'react';
import './ReaderListItem.css';
import DOMPurify from 'dompurify';

const ReaderListItem = (props) => {
const { title, imageSrc, publisher, summary } =  props.article;

  return(
    <a href={props.article.url} target="_blank">
      <div className='list-item-container'>
        <div className='thumbnail-container'>
          <img className='thumbnail' src={imageSrc}/>
        </div>
        <div className='article-text-container'>
          <h2 className='article-title'>{title}</h2>
          <p className='article-publisher'>{publisher}</p>
          <p className='article-description' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(summary)}}></p>
        </div>
      </div>
    </a>
  )
}

export default ReaderListItem;
