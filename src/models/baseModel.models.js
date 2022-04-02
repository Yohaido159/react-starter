import { useDispatch, useSelector } from "react-redux";
import { wrapAction } from "saga-axios/dist/core";
import { BaseModel } from "redux-model-builder";
import { useUIActions } from "../redux/UI/UI.actions";

export const useBaseModel = () => {
  const dispatch = useDispatch();
  const UIActions = useUIActions();
  BaseModel.setDispatch = dispatch;
  BaseModel.makeActionsBefore = ({ options, config }) => {
    console.log("options", options);
    return [
      wrapAction({
        on: "ANY",
        func: () => {
          if (config.withModel) {
            UIActions.openModel({
              id: "progress",
            });
            UIActions.modifyModel({
              id: "progress",
              path: "payload.status",
              data: "start",
              effect: "replace",
            });
          }
        },
      }),
    ];
  };
  BaseModel.makeActions = ({ options, config }) => [
    wrapAction({
      on: "SUCCESS",
      func: () => {
        if (config.withModel) {
          UIActions.modifyModel({
            id: "progress",
            path: "payload.status",
            data: "success",
            effect: "replace",
          });
          UIActions.clearModel({
            id: "progress",
          });
        }
      },
    }),
    wrapAction({
      on: "FAIL",
      func: (data) => {
        if (config.withModel) {
          UIActions.modifyModel({
            id: "progress",
            path: "payload.content.title",
            data: "הפעולה נכשלה",
            effect: "replace",
          });
          UIActions.modifyModel({
            id: "progress",
            path: "payload.status",
            data: "fail",
            effect: "replace",
          });
          UIActions.modifyModel({
            id: "progress",
            path: "payload.detail",
            data: data.detail ? data.detail : data,
          });
        }
      },
    }),
  ];

  return BaseModel;
};
