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
