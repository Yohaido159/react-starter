import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { wrapAction } from "saga-axios/dist/core";

import { urls } from "../../urls/urls";
import { setUserToken } from "../../utils/utils";
import { useBaseModel } from "../baseModel.models";

export const useModelUsers = (props) => {
  const dispatch = useDispatch();
  const BaseModel = useBaseModel();

  const navigator = useNavigate();

  class ModelUsers extends BaseModel {
    constructor(props) {
      super();
      this.type = "USERS_ADD_TO_REDUX";
      this.url = urls.models.users.self;
    }
    itemsPath(data) {
      return `items.me`;
    }
    itemPath(path, data) {
      return `${path}`;
    }

    createItem(options = {}) {
      super.createItem({
        ...options,
        id: "auth/register",
        config: {
          resPath: "data.user",
        },
        options: {
          withToken: false,
        },
        actions: [
          wrapAction({
            func: (data) => {
              const access_token = data.data.access_token;
              setUserToken(access_token);
            },
          }),
        ],
      });
    }

    login(options = {}) {
      super.actionItem({
        ...options,
        method: "post",
        id: "auth/login",
        config: {
          resPath: "data.user",
        },
        options: {
          withToken: false,
        },
        actions: [
          wrapAction({
            func: (data) => {
              const access_token = data.data.access_token;
              setUserToken(access_token);
            },
          }),
        ],
      });
    }
  }
  const instance = new ModelUsers();
  return instance;
};

export default useModelUsers;
