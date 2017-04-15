import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { updateArticles } from './actions';

export function* getArticles() {
  try {
    const response = yield call(axios.get, '/api/articles/');
    yield put(updateArticles(response.data))
  } catch (e) {
    console.log('Error: ', e);
  }
}

export default function *rootSaga() {
  yield takeEvery('GET_ARTICLES_FROM_DB', getArticles);
}
