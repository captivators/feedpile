import React from 'react';

const FeedListItem = (props) => {
  return (
    <div>
      <h5>{props.feed.name}</h5>
    </div>
    )
}

export default FeedListItem;