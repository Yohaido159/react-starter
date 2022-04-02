import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { urls } from "../../urls/urls";
import { setPassData, setAddToRedux } from "../../redux/global/global.actions";
import { useBaseModel } from "../baseModel.models";

export const useModelDegreeFiles = (props) => {
  const dispatch = useDispatch();
  const BaseModel = useBaseModel();

  class ModelDegreeFiles extends BaseModel {
    constructor(props) {
      super();
      this.type = "DEGREES_ADD_TO_REDUX";
      this.url = urls.models.degrees.degree_file;
    }

    createItem(options = {}) {
      super.createItem({
        ...options,
        // options: {
        //   contentType: "multipart/form-data",
        // },
      });
    }
    itemsPath(data) {
      return `items.degrees.files`;
    }
    itemPath(path, data) {
      return `${path}.${data.data.id}`;
    }
  }
  const instance = new ModelDegreeFiles();
  return instance;
};

export default useModelDegreeFiles;
