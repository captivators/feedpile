import React from 'react';

const ReaderListItem = (props) => {
  return(
    <div className='pure-g'>
      <img className='pure-u-1-3' src={props.article.image}/>
      <div className='pure-u-2-3'>
        <h2 className='article-title'>{props.article.name}</h2>
        <p className='article-publisher'>{props.article.owner}</p>
        <p className='article-content'>{props.article.description}</p>
      </div>
    </div>
  )
}

export default ReaderListItem;
