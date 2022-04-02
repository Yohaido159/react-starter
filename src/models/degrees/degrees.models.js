import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { urls } from "../../urls/urls";
import { setPassData, setAddToRedux } from "../../redux/global/global.actions";
import { useBaseModel } from "../baseModel.models";
export const useModelDegrees = (props) => {
  const dispatch = useDispatch();
  const BaseModel = useBaseModel();

  class ModelDegrees extends BaseModel {
    constructor(props) {
      super();
      this.type = "DEGREES_ADD_TO_REDUX";
      this.url = urls.models.degrees.degree;
    }
    itemsPath(data) {
      return `items.degrees.${data.more_data.status}`;
    }
    itemPath(path, data) {
      return `${path}.${data.data.id}`;
    }

    retrieveItem(options = {}) {
      const { params } = options;
      super.retrieveItem({
        ...options,
        params,
      });
    }
  }
  const instance = new ModelDegrees();
  return instance;
};

export default useModelDegrees;
