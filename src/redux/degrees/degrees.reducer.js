import { createReducer } from "@reduxjs/toolkit";
import { processSetAddToRedux } from "../../utils/utils";

export const INIT_STATE = {};

const degreesReducer = createReducer(INIT_STATE, {
  DEGREES_ADD_TO_REDUX: (state, action) => {
    processSetAddToRedux(action, state);
  },
});
export default degreesReducer;
