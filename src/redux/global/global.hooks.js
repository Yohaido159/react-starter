import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash.get";

import { selectSomeDataExist } from "../global/global.selectors";
import { sendToSagaProcess, setAddToRedux } from "../global/global.actions";
import { urls } from "../../utils/urls";

export const useWithRetriveData = (
  options = {
    actionsBefore: []
  },
  moreActions = []
) => {
  //console.log("options", options);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const rowsExist = useSelector(state => selectSomeDataExist(state, options.rowsExist));

  useEffect(() => {
    if (!options.dep) return;
    dispatch(
      sendToSagaProcess({
        actionsBefore: [
          {
            func: payload => {
              if (rowsExist) {
                return { status: "exit" };
              }
              return {};
            }
          },
          ...options.actionsBefore
        ],
        sagaType: "takeEvery",
        url: options.url,
        method: "GET",
        actions: [
          {
            on: "SUCCESS",
            payload: "data",
            func: data => {
              setData(data);
              dispatch(
                setAddToRedux({
                  type: get(options, "setAddToRedux.type"),
                  path: get(options, "setAddToRedux.path"),
                  effect: get(options, "setAddToRedux.effect"),
                  data: data
                })
              );
            }
          },
          ...moreActions
        ]
      })
    );
  }, [options.dep]);
  return data;
};
