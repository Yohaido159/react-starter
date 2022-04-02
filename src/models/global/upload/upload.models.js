import React from "react";
import axios from "axios";
import { sendToProcessAction, wrapAction } from "saga-axios/dist/core";

import { urls, BUCKET_BASE } from "../../../urls/urls";
import { useDispatch, useSelector } from "react-redux";

import uniqueId from "lodash.uniqueid";

import { getNameExt } from "../../../utils/utils";

import { useUIActions } from "../../../redux/UI/UI.actions";
import { useBaseModel } from "../../baseModel.models";

export const useModelUpload = (props) => {
  const dispatch = useDispatch();
  const BaseModel = useBaseModel();
  const UIActions = useUIActions();

  console.log("UIActions", UIActions);

  class ModelUpload extends BaseModel {
    constructor(props) {
      super();
      this.type = "UI_ADD_TO_REDUX";
      this.url = urls.models.uploader.POLICY;
    }

    itemsPath(data) {
      return `uploader.items`;
    }
    itemPath(path, data) {
      return `${path}.${uniqueId()}`;
    }

    async uploadFile(options = {}) {
      let { file, actions = [] } = options;
      let res = await axios.get(file.url, { responseType: "blob" });
      console.log("res", res);
      file = new File([res.data], file.name);
      console.log("file", file);
      super.actionItem({
        ...options,
        url: urls.models.uploader.POLICY,
        method: "POST",
        actions: [
          wrapAction({
            func: (data) => {
              const { key, policy, acl, signature, aws_access_key_id } =
                data.data;
              const contentType =
                file.type !== "" ? file.type : "application/octet-stream";

              dispatch(
                sendToProcessAction({
                  url: BUCKET_BASE,
                  method: "POST",
                  payload: {
                    key,
                    acl,
                    "Content-Type": contentType,
                    "Cache-Control": "max-age=31536000",
                    AWSAccessKeyId: aws_access_key_id,
                    Policy: policy,
                    filename: file.name,
                    Signature: signature,
                    file,
                  },
                  out_state: data,
                  options: {
                    contentType: "multipart/form-data",
                    withToken: false,
                    config: {
                      onUploadProgress: (progress) => {
                        let percentage = Math.round(
                          (progress.loaded * 100) / progress.total
                        );
                        console.log("percentage", percentage);
                        // dispatch(
                        //   setUploadPercentage({
                        //     name: file.name,
                        //     unique_id,
                        //     percentage,
                        //     status: "uploading",
                        //   })
                        // );
                      },
                    },
                  },
                  actions: [
                    {
                      on: "SUCCESS",
                      payload: "data",
                      func: () => {
                        // dispatch(
                        //   setUploadPercentage({
                        //     unique_id,
                        //     status: "success",
                        //   })
                        // );
                      },
                    },
                    ...actions,
                  ],
                })
              );
            },
          }),
        ],
      });
    }

    retrieveCookie(options = {}) {
      super.actionItem({
        ...options,
        method: "get",
        url: urls.models.uploader.retrieve_cookie,
        config: {
          withUpdateRedux: false,
        },
      });
    }
  }
  const instance = new ModelUpload();
  return instance;
};

export default useModelUpload;
