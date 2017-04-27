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
      articlesFound.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });
    }
  }
  return articlesFound;
};

export default createSelector(
    allArticlesSelector,
    currentFeedSelector,
    selectedFeeds
)
