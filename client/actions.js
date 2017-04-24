export const setCurrentArticle = (article) => {
  return {type: "SET_CURRENT_ARTICLE", article}
};

export const toggleModal = (openStatus) => {
  return {type: "TOGGLE_MODAL", openStatus}
};

export const findCreateUser = (userId) => {
  return {type: 'FIND_OR_CREATE_USER', userId}
};

export const setUser = (userObj, categoryList, feedList) => {
  return {type: 'SET_USER',  userObj, categoryList, feedList}
};

export const loginSuccess = (profile) => {
  return {type: 'LOGIN_SUCCESS', profile}
};

export const logoutSuccess = () => {
  return {type: 'LOGOUT_SUCCESS'}
};

export const loginError = (err) => {
  return {type: 'LOGIN_ERROR', err}
};

export const fetchArticlesForFeedsFromDb = () => {
  return {type: 'FETCH_ARTICLES_FOR_FEEDS'}
};

export const getArticlesForAllFeeds = (articleList) => {
  return {type: 'GET_ARTICLES_FOR_ALL_FEEDS', articleList}
};

export const setSidebarFeed = (currentFeed) => {
  return {type: 'SET_SIDEBAR_FEED', currentFeed}
};

export const addFeed = (url, userId, categoryId) => {
  return {type: 'ADD_FEED', url, userId, categoryId}
};

export const setAddFeedUrl = (url) => {
  return {type: 'SET_ADD_FEED_URL', url}
}

export const setAddFeedCategoryId = (categoryId) => {
  return {type: 'SET_ADD_FEED_CATEGORY_ID', categoryId}
}

export const addFeedToCategory = (feedName, feedId, categoryId) => {

  return {type: 'ADD_FEED_TO_CATEGORY', feedName, feedId, categoryId}
}

export const setDisplayProgress = (value) => {
  return {type: 'SET_DISPLAY_PROGRESS', value}
};
