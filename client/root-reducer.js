// import data from '../data.json';

const initialState = {
  articles: [],
  open: false,
  modalOpen: false,
  toggleListItem: '',
  currentArticleIndex: null
};

const toggleListItem = (state, action) => {
  // return Object.assign({}, state, {open: action.item.state.open});
  return {...state, toggleListItem : action.item.props.primaryText}  //with babel-preset-stage-2
};

const updateArticles = (state, action) => {
  return {...state, articles: action.articles}
};

const setCurrentArticle = (state, action) => {
  return {...state, currentArticleIndex: action.articleIndex}
};

const toggleModal = (state, action) => {
  return {...state, modalOpen: action.openStatus}
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_NESTED_ITEM':
      return toggleListItem(state, action);
    case 'UPDATE_ARTICLES':
      return updateArticles(state, action);
    case 'SET_CURRENT_ARTICLE':
      return setCurrentArticle(state, action);
    case 'TOGGLE_MODAL':
      return toggleModal(state, action)
    default:
      return state
  }
}

export default rootReducer;
