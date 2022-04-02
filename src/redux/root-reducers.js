import { combineReducers } from "redux";

import usersReducer from "./users/users.reducer";
import degreesReducer from "./degrees/degrees.reducer";
import GlobalReducer from "./global/global.reducer";
import UIReducer from "./UI/UI.reducer";

export default combineReducers({
  users_main: usersReducer,
  degrees_main: degreesReducer,
  global_main: GlobalReducer,
  UI_main: UIReducer,
});
