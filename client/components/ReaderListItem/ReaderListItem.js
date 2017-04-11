import React from 'react';
import './ReaderListItem.css';

const ReaderListItem = (props) => {
  return(
    <div className='list-item-container'>
      <div className='thumbnail-container'>
        <img className='thumbnail' src={props.article.image}/>
      </div>
      <div className='article-text-container'>
        <h2 className='article-title'>{props.article.name}</h2>
        <p className='article-publisher'>{props.article.owner}</p>
        <p className='article-content'>{props.article.description}</p>
      </div>
    </div>
  )
}

export default ReaderListItem;
