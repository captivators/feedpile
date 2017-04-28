import { call, put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga'
import axios from 'axios';
import {setUser,loginSuccess, getArticlesForAllFeeds, updateFeedsArticlesInStore,
addFeedToCategory, setDisplayProgress, showWelcome, setCurrentFeedTitle} from './actions';

const createUserObj = (userObj, categoryList, feedList) => {
  const result = {};
  if(userObj.feeds) {
  userObj.feeds.forEach(function(feed) {
    if(!result[feed.categoryId]) {
      result[feed.categoryId] = {"categoryName": "", "feeds": []};
      for (let i = 0; i < categoryList.length; i++) {
        if (categoryList[i]._id === feed.categoryId) {
          result[feed.categoryId].categoryName = categoryList[i].name;
          break;
        }
      }
      for (let i = 0; i < feedList.length; i++) {
        if (feedList[i]._id === feed.feedId) {
          result[feed.categoryId].feeds.push({"name": feedList[i].name, "feedId": feed.feedId});
          break;
        }
      }
    }
    else {
      for (let i = 0; i < categoryList.length; i++) {
        if (categoryList[i]._id === feed.categoryId) {
          result[feed.categoryId].categoryName = categoryList[i].name;
          break;
        }
      }
      for (let i = 0; i < feedList.length; i++) {
        if (feedList[i]._id === feed.feedId) {
          result[feed.categoryId].feeds.push({"name": feedList[i].name, "feedId": feed.feedId});
          break;
        }
      }
    }
});

  }
  return result;
};

export function* findCreateUser(userId) {
  try {
    const userObj = yield call(axios.post, '/api/users/', userId);
    if(userObj.data.user.feeds.length === 0) yield put(showWelcome(true));
    const categoryList = yield call(axios.get, '/api/categories');
    const feedList = yield call(axios.get, '/api/feeds/');
    const result = createUserObj(userObj.data.user, categoryList.data, feedList.data);
    yield put(setUser(result, categoryList.data, feedList.data));
    yield put(loginSuccess(JSON.parse(localStorage.getItem('profile'))));
  } catch (e) {
    console.log('Error: ', e);
  }
}

export function* getArticlesForAllFeedsFromdb() {
  try {
    const userId = JSON.parse(localStorage.getItem('profile')).identities[0].user_id;

    const userObj = yield call(axios.post, '/api/users/', {userId: userId});
    // Parallel calls
    const responses  = yield userObj.data.user.feeds.map(feed => call(axios.post, '/api/articles', {feedId: feed.feedId}));

    const result = {};
    for(let i=0; i< responses.length; i++) {
      result[userObj.data.user.feeds[i].feedId] = responses[i].data;
    }
    yield put(getArticlesForAllFeeds(result));
    yield put(setDisplayProgress(false));

  } catch (e) {

  }
}

export function* addFeedToDb(action) {
  try {
    const categoryId = action.categoryId;
    const response = yield call(axios.post, '/api/feeds', {url: action.url, userId: action.userId, categoryId: action.categoryId});
    yield put(showWelcome(false));
    const {feedId, feedUrl, feedName, feedImageSrc, feedArticles} = response.data;
    const newFeedObj = {
      _id: feedId,
      url: feedUrl,
      name: feedName,
      imageSrc: feedImageSrc
    };
    yield put(addFeedToCategory(feedName, feedId, categoryId));
    yield put(updateFeedsArticlesInStore(feedArticles, newFeedObj));
    yield put(setDisplayProgress(false));
  } catch (e) {
    console.log('Error: ', e);
  }
}

export function* deleteFeedsFromDb(action) {
  try {
    // Sequential calls (one after the other)
    for(let i=0; i<action.feeds.length; i++) {
      yield call(axios.delete, `/api/feeds/${action.feeds[i]}`, {data : {userId: action.userId}})
    }
    yield call(findCreateUser, {userId: action.userId});
    yield call(getArticlesForAllFeedsFromdb);
    yield put(setDisplayProgress(false));
    yield put(setCurrentFeedTitle('All Articles'));
 } catch (e) {

 }
}

export default function *rootSaga() {
  yield takeEvery('FIND_OR_CREATE_USER', findCreateUser);
  yield takeEvery('FETCH_ARTICLES_FOR_FEEDS', getArticlesForAllFeedsFromdb);
  yield takeEvery('ADD_FEED', addFeedToDb);
  yield takeEvery('DELETE_FEEDS_FROM_DB', deleteFeedsFromDb)
}
