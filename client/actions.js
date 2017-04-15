export const toggleListItem = (item) => {
  return {type: "TOGGLE_NESTED_ITEM", item}
};

export const getArticlesFromDb = (articles) => {
  return {type: "GET_ARTICLES_FROM_DB", articles}
};

export const updateArticles = (articles) => {
  return {type: "UPDATE_ARTICLES", articles}
};
