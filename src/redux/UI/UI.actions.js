import get from "lodash.get";
import { useDispatch } from "react-redux";

import { setAddToRedux } from "../global/global.actions";
import { INIT_STATE } from "./UI.reducer";

export const useUIActions = () => {
  const dispatch = useDispatch();
  return {
    modifyModel: modifyModel(dispatch),
    clearModel: clearModel(dispatch),
    openModel: openModel(dispatch),
  };
};

const modifyModel =
  (dispatch) =>
  (options = {}) => {
    const { id, data, path, effect = "modify" } = options;

    dispatch(
      setAddToRedux({
        type: "UI_ADD_TO_REDUX",
        path: `models.${id}.${path}`,
        effect,
        data,
      })
    );
  };
const clearModel =
  (dispatch) =>
  (options = {}) => {
    const { id, effect = "replace" } = options;
    dispatch(
      setAddToRedux({
        type: "UI_ADD_TO_REDUX",
        path: `models.${id}`,
        effect,
        data: get(INIT_STATE.models, id),
      })
    );
  };

const openModel =
  (dispatch) =>
  (options = {}) => {
    const { id, effect = "replace" } = options;
    dispatch(
      setAddToRedux({
        type: "UI_ADD_TO_REDUX",
        path: `models.${id}.status`,
        effect,
        data: "open",
      })
    );
  };
