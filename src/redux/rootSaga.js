// rootSaga.js
import { all } from 'redux-saga/effects';
import { watchUserAuthentication } from './userSagaFunctions';

export default function* rootSaga() {
  yield all([watchUserAuthentication()]);
}
