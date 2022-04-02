import { all, fork } from "redux-saga/effects";
import { takeEverySendToProcess } from "saga-axios";

export default function* rootSaga() {
  yield all([fork(takeEverySendToProcess)]);
}
