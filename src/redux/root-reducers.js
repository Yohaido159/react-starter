import { combineReducers } from "redux";

import usersReducer from "./users/users.reducer";
import GlobalReducer from "./global/global.reducer";
import UIReducer from "./UI/UI.reducer";

export default combineReducers({
  users_main: usersReducer,
  global_main: GlobalReducer,
  UI_main: UIReducer,
});
