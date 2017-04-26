import { createSelector } from 'reselect'

const feedsSelector = state => state.feeds;   //all feeds
const userFeedsSelector = state => state.articles;

const getFeeds = (allFeeds, articles) => {
  const userFeedsIds = Object.keys(articles);
  const userFeeds = allFeeds.filter(feed => userFeedsIds.includes(feed._id));
  return userFeeds;
};

export default createSelector(
    feedsSelector, // pick off a piece of state
    userFeedsSelector, // pick off a piece of state
    getFeeds // last argument is the function that has our select logic
);