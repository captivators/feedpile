import React from 'react';
import './ReaderListItem.css';

const ReaderListItem = (props) => {
  return(
    <div className='list-item-container'>
      <a href={props.article.url} target="_blank">
        <div className='thumbnail-container'>
          <img className='thumbnail' src={props.article.image}/>
        </div>
        <div className='article-text-container'>
          <h2 className='article-title'>{props.article.title}</h2>
          <p className='article-publisher'>{props.article.publisher}</p>
          <p className='article-description'>{props.article.description}</p>
        </div>
      </a>
    </div>
  )
}

export default ReaderListItem;
