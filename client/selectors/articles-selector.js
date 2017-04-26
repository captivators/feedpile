import { createSelector } from 'reselect'

const allArticlesSelector = state => state.articles;
const currentFeedSelector = state => state.currentFeed;

const selectedFeeds = (allArticles, currentFeeds) => {
  let articlesFound = [];
  if(!Array.isArray(allArticles)) {
    if(currentFeeds !== "" && allArticles[currentFeeds]) {
      articlesFound = allArticles[currentFeeds];
    } else {
      for(let key in allArticles) {
        articlesFound = articlesFound.concat(allArticles[key]);
      }
    }
  }
  return articlesFound;
};

export default createSelector(
    allArticlesSelector,
    currentFeedSelector,
    selectedFeeds
)