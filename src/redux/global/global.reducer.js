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
  passData: {
    Dashboard: {
      firstDegree: {
        roadA: {
          must: {
            YoreYore: true,
            yeshiva: 60, // 60 months
            diploma: true,
          },
        },
        roadB: {
          must: {
            YoreYorePrivate: true,
            yeshiva: 60,
            quizRav: ["ravZvei", "ravIsrael", "ravPaperHigh"],
            diploma: true,
          },
        },
      },
      secondDegree: {
        roadA: {
          must: {
            YoreYore: true,
            yeshiva: 96,
            diploma: true,
          },
        },
        roadB: {
          must: {
            ravZvei: true,
            yeshiva: 96,
            diploma: true,
          },
        },
        roadC: {
          must: {
            ravCity: true,
            diploma: true,
          },
        },
        roadD: {
          must: {
            quizRav: ["YoreYore", "ravZvei"],
            books: true,
            yeshiva: 60,
            diploma: true,
          },
        },
      },
      thirdDegree: {
        roadA: {
          must: {
            ravCity: true,
            yeshiva: 96,
            isEndArmyInYear: false,
            diploma: true,
          },
          isEndArmyInYearAttach: [{ mock: "true" }],
          isEndArmyInYearMessage: 'תאריך התת"ש צריך להיות גדול משנה',
        },
        roadB: {
          must: {
            books: true,
            yeshiva: 96,
            isEndArmyInYear: false,
            diploma: true,
          },
          isEndArmyInYearAttach: [{ mock: "true" }],
          isEndArmyInYearMessage: 'תאריך התת"ש צריך להיות גדול משנה',
        },
        roadC: {
          must: {
            ravCity: true,
            books: true,
            isEndArmyInYear: false,
            diploma: true,
          },
          isEndArmyInYearAttach: [{ mock: "true" }],
          isEndArmyInYearMessage: 'תאריך התת"ש צריך להיות גדול משנה',
        },
        roadD: {
          must: {
            dayan: true,
            isEndArmyInYear: false,
            diploma: true,
          },
          isEndArmyInYearAttach: [{ mock: "true" }],
          isEndArmyInYearMessage: 'תאריך התת"ש צריך להיות גדול משנה',
        },
      },
    },
  },
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
