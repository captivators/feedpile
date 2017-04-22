export const setCurrentArticle = (article) => {
  return {type: "SET_CURRENT_ARTICLE", article}
};

export const toggleModal = (openStatus) => {
  return {type: "TOGGLE_MODAL", openStatus}
};

export const findCreateUser = (userId) => {
  return { type: 'FIND_OR_CREATE_USER', userId}
};

export const setUser = (userObj, categoryList, feedList) => {
  return { type: 'SET_USER',  userObj, categoryList, feedList}
};

export const loginSuccess = (profile) => {
  return { type: 'LOGIN_SUCCESS', profile }
};

export const logoutSuccess = () => {
  return { type: 'LOGOUT_SUCCESS' }
};

export const loginError = (err) => {
  return { type: 'LOGIN_ERROR', err }
};

export const fetchArticlesForFeedsFromDb = () => {
  return { type: 'FETCH_ARTICLES_FOR_FEEDS'}
};

export const getArticlesForAllFeeds = (articleList) => {
  return { type: 'GET_ARTICLES_FOR_ALL_FEEDS', articleList}
};

export const setSidebarFeed = (currentFeed) => {
  return { type: 'SET_SIDEBAR_FEED', currentFeed}
};
