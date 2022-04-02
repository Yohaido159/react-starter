import { createReducer } from "@reduxjs/toolkit";
import UsersTypes from "./users.types";

import { processSetAddToRedux } from "../../utils/utils";

const INIT_STATE = {};

const usersReducer = createReducer(INIT_STATE, {
  [UsersTypes.USERS_ADD_TO_REDUX]: (state, action) => {
    processSetAddToRedux(action, state);
  },
});

export default usersReducer;
