import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {setUser,loginSuccess, getArticlesForAllFeeds } from './actions';

const createUserObj = (userObj, categoryList, feedList) => {
  const result = {};
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
  return result;
};

export function* findCreateUser(userId) {
  try {
    const userObj = yield call(axios.post, '/api/users/', userId);
    const categoryList = yield call(axios.get, '/api/categories');
    const feedList = yield call(axios.get, '/api/feeds/');
    localStorage.setItem('feedList', JSON.stringify(feedList.data));
    const result = createUserObj(userObj.data, categoryList.data, feedList.data);
    yield put(setUser(result, categoryList.data, feedList.data));
    yield put(loginSuccess(JSON.parse(localStorage.getItem('profile'))));
  } catch (e) {
    console.log('Error: ', e);
  }
}

export function* getArticlesForAllFeedsFromdb() {
  try {
    const feedObj = JSON.parse(localStorage.getItem('feedList'));
    const responses  = yield feedObj.map(feed => call(axios.post, '/api/articles', {feedId: feed._id}));
    const result = {};
    for(let i=0; i< responses.length; i++) {
      result[feedObj[i]._id] = responses[i].data;
    }
    yield put(getArticlesForAllFeeds(result));
  } catch (e) {

  }
}

export default function *rootSaga() {
  yield takeEvery('FIND_OR_CREATE_USER', findCreateUser);
  yield takeEvery('FETCH_ARTICLES_FOR_FEEDS', getArticlesForAllFeedsFromdb);
}
