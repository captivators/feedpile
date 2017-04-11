import React from 'react';
import FeedListItem from '../FeedListItem/FeedListItem'

const FeedList = (props) => {
  return (
 <div>
      <h2>All</h2>
      {props.feeds.map((feeds, index) => {
        <FeedListItem feed={feed} key={index} onClick= />
      })}
    </div>
  )
}
