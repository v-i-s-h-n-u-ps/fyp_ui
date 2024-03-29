import { all } from "redux-saga/effects";
import { userSaga } from "./user/sagas";
import { resourceSaga } from "./resources/sagas";
import { projectSaga } from "./projects/sagas";
import { forumSaga } from "./forums/sagas";

export default function* rootSaga() {
  yield all({
    ...userSaga,
    ...resourceSaga,
    ...projectSaga,
    ...forumSaga
  });
}
