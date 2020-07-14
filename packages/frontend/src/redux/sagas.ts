import { put, takeEvery, select, call } from 'redux-saga/effects';
import {
  LOAD_REPOSITORIES_LOADING,
  LOAD_REPOSITORIES_FAILURE,
  LOAD_REPOSITORIES_SUCCESS,
} from './actions/types';
import agent from '../network/agent';

function* fetchRepositories() {
  const repositories = yield select((state) => state);
  try {
    const response = yield call(
      (query, page, perPage) =>
        agent.Repositories.repositories(query, page, perPage),
      repositories.query,
      repositories.page,
      repositories.perPage
    );
    yield put({ type: LOAD_REPOSITORIES_SUCCESS, data: response });
  } catch (e) {
    yield put({ type: LOAD_REPOSITORIES_FAILURE, error: e.message });
  }
}

function* repositoriesSaga() {
  yield takeEvery(LOAD_REPOSITORIES_LOADING, fetchRepositories);
}

export default repositoriesSaga;
