import { firestoreReducer } from "redux-firestore";
import { combineReducers } from "redux";

export default combineReducers({
  firestore: firestoreReducer
});
