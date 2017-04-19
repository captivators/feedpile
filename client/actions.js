export const toggleListItem = (item) => {
  return {type: "TOGGLE_NESTED_ITEM", item}
};

export const getArticlesFromDb = () => {
  return {type: "GET_ARTICLES_FROM_DB"}
};

export const updateArticles = (articles) => {
  return {type: "UPDATE_ARTICLES", articles}
};

export const setCurrentArticle = (articleIndex) => {
  return {type: "SET_CURRENT_ARTICLE", articleIndex}
};

export const toggleModal = (openStatus) => {
  console.log('Inside toggleModal action, openStatus: ', openStatus);
  return {type: "TOGGLE_MODAL", openStatus}
};

export const loginSuccess = (profile) => {
  return { type: 'LOGIN_SUCCESS', profile }
};

export const logoutSuccess = (profile) => {
  return { type: 'LOGOUT_SUCCESS' }
};

export const loginError = (err) => {
  return { type: 'LOGIN_ERROR', err }
};
