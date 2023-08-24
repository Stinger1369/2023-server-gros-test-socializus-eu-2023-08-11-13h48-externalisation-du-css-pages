import { combineReducers } from "redux";
import { getLangue } from "./singleReducers/langueReducer.js";

export default combineReducers({
  langue: getLangue
});
