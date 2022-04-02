import React from "react";
import { createReducer } from "@reduxjs/toolkit";

import UITypes from "./UI.types";
import { processSetAddToRedux } from "../../utils/utils";

// import ProgressInModel from "../../reuse/ProgressInModel/ProgressInModel";
const ProgressInModel = React.lazy(() =>
  import("../../reuse/ProgressInModel/ProgressInModel")
);
const CheckDegree = React.lazy(() =>
  import("../../pages/Degrees/CheckDegree/CheckDegree")
);

export const INIT_STATE = {
  models: {
    base: {
      status: "close",
      options: {},
      payload: {},
    },
    progress: {
      status: "close",
      options: {},
      payload: {
        content: {
          title: "בהתליך",
          actions: [
            {
              type: "comp",
              comp: () => <ProgressInModel />,
              size: 12,
            },
          ],
        },
        payload: {
          courseId: "courseId",
        },
        config: {
          stickTop: true,
        },
        withCloseButton: true,
        style: {},
      },
    },
    baseModel: {
      status: "close",
      options: {},
      payload: {
        content: {
          title: "בדיקת נתונים",
          actions: [
            {
              type: "comp",
              comp: () => <CheckDegree />,
              size: 12,
            },
          ],
        },
        payload: {
          courseId: "courseId",
        },
        config: {
          stickTop: true,
        },
        withCloseButton: true,
        // withoutClickClose: true,
        style: {},
      },
    },
  },
  uploader: {
    items: {},
  },
};

const UIReducer = createReducer(INIT_STATE, {
  [UITypes.UI_ADD_TO_REDUX]: (state, action) => {
    processSetAddToRedux(action, state);
  },
});
export default UIReducer;
