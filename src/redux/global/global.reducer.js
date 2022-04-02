import { createReducer } from "@reduxjs/toolkit";
import Globaltypes from "./global.types";
import set from "lodash.set";
import setWith from "lodash.setwith";
import get from "lodash.get";
import unset from "lodash.unset";
import {
  // deeptest,
  processSetAddToRedux,
  makeDeepTest,
} from "../../utils/utils";

export const INITIAL_STATE = {
  passData: {},
};

const GlobalReducer = createReducer(INITIAL_STATE, {
  [Globaltypes.PASS_DATA]: (state, action) => {
    if (!action.payload.effect) {
      action.payload.effect = "modify";
    }
    action.payload.path = `passData.${action.payload.path}`;

    const isExsist = action.payload.path;
    makeDeepTest(isExsist, state);

    processSetAddToRedux(action, state);

    const func = action.payload.func;
    if (func) {
      const res = func(state);
      console.log("res", res);
      if (res === "exit") return;
    }
  },
  [Globaltypes.PASS_DATA_CLEAR]: (state, action) => {
    state.passData[action.id] = {};
  },
  [Globaltypes.GLOBAL_ADD_TO_REDUX]: (state, action) => {
    processSetAddToRedux(action, state);
  },
});
export default GlobalReducer;
