import React from 'react';
import './ReaderListItem.css';
import DOMPurify from 'dompurify';

const ReaderListItem = (props) => {
  const { title, image, publisher, description } =  props.article;

  return(
    <a href={props.article.url} target="_blank">
      <div className='list-item-container'>
        <div className='thumbnail-container'>
          <img className='thumbnail' src={image}/>
        </div>
        <div className='article-text-container'>
          <h2 className='article-title'>{title}</h2>
          <p className='article-publisher'>{publisher}</p>
          <p className='article-description' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}}></p>
        </div>
      </div>
    </a>
  )
}

export default ReaderListItem;
