const jwtDecode = require('jwt-decode');

const checkTokenExpiry = () => {
  let jwt = localStorage.getItem('id_token');
  if(jwt) {
    let jwtExp = jwtDecode(jwt).exp;
    let expiryDate = new Date(0);
    expiryDate.setUTCSeconds(jwtExp);

    if(new Date() < expiryDate) {
      return true;
    }
  }
  return false;
};

const initialState = {
  articles: [],
  open: false,
  modalOpen: false,
  currentArticle: '',
  isAuthenticated: checkTokenExpiry(),
  redirect: false,
  profile: JSON.parse(localStorage.getItem('profile')),
  error: '',
  user: {},
  categories: [],
  feeds: [],
  currentFeed: '',
  addFeedUrl: '',
  addFeedCategoryId: '',
  displayProgress: false
};

const updateArticles = (state, action) => {
  return {...state, articles: action.articles}
};

const setCurrentArticle = (state, action) => {
  return {...state, currentArticle: action.article}
};

const toggleModal = (state, action) => {
  return {...state, modalOpen: action.openStatus}
};

const loginSuccess = (state, action) => {
  return { ...state, isAuthenticated: true, profile: action.profile, error: '', redirect: true }
};
const logoutSuccess = (state, action) => {
  return { ...state, isAuthenticated: false, profile: null, redirect: false}
};
const loginError = (state, action) => {
  return { ...state, isAuthenticated: false, profile: null, error: action.error }
};
const setUser = (state, action) => {
  return { ...state, user: action.userObj, categories: action.categoryList, feeds: action.feedList}
};

const getArticlesForAllFeeds = (state, action) => {
  return { ...state, articles: action.articleList}
};

const setSidebarFeed = (state, action) => {
  return { ...state, currentFeed: action.currentFeed}
};

const setAddFeedUrl = (state, action) => {
  console.log('Inside root reducer for setAddFeedUrl')
  console.log('url: ', action.url);
  return { ...state, addFeedUrl: action.url}
}

const setAddFeedCategoryId = (state, action) => {
  console.log('Inside root reducer for setAddFeedCategoryId');
  console.log('categoryId: ', action.categoryId);
  return { ...state, addFeedCategoryId: action.categoryId}
}

const addFeedToCategory = (state, action) => {
  if(!state.user[action.categoryId]) {
    let categoryName;
    for(let i=0; i<state.categories.length; i++) {
      if(state.categories[i]._id === action.categoryId) {
        categoryName = state.categories[i].name;
      }
    }
    return {
      ...state,
      user: {
        ...state.user,
        [action.categoryId]: {categoryName, feeds: [].concat({name: action.feedName, feedId: action.feedId})}
      }
    }
  } else {
    return {
      ...state, user: {
        ...state.user,
        [action.categoryId]: {
          ...state.user[action.categoryId],
          feeds: state.user[action.categoryId].feeds.concat({name: action.feedName, feedId: action.feedId})
        }
      }
    }
  }
};

const setDisplayProgress = (state, action) => {
  return {...state, displayProgress: action.value}
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_ARTICLE':
      return setCurrentArticle(state, action);
    case 'TOGGLE_MODAL':
      return toggleModal(state, action);
    case 'LOGIN_SUCCESS':
      return loginSuccess(state, action);
    case 'LOGOUT_SUCCESS':
      return logoutSuccess(state, action);
    case 'LOGIN_ERROR':
      return loginError(state, action);
    case 'SET_USER':
      return setUser(state, action);
    case 'GET_ARTICLES_FOR_ALL_FEEDS':
      return getArticlesForAllFeeds(state, action);
    case 'SET_SIDEBAR_FEED':
      return setSidebarFeed(state, action);
    case 'ADD_FEED':
      console.log('Feed successfully added');
      return state;
    case 'SET_ADD_FEED_URL':
      return setAddFeedUrl(state, action);
      case 'SET_ADD_FEED_CATEGORY_ID':
        return setAddFeedCategoryId(state, action);
      case 'ADD_FEED_TO_CATEGORY':
        return addFeedToCategory(state, action);
    case 'SET_DISPLAY_PROGRESS':
        return setDisplayProgress(state, action);
    default:
      return state
  }
}

export default rootReducer;
