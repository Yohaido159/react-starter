import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useUIActions } from "../../redux/UI/UI.actions";
import { modelsKeysSelector } from "../../redux/UI/UI.selectors";
import useModelUser from "../../models/users/users.models";
import { usersSelector } from "../../redux/users/users.selectors";
import { getUserToken } from "../../utils/utils";

import CircularProgress from "@mui/material/CircularProgress";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckIcon from "@mui/icons-material/Check";

import ModalWithDep from "../../reuse/ModalWithDep/ModalWithDep";
import BaseModel from "../../reuse/BaseModal/BaseModal";
import BaseIconCircle from "../../reuse/BaseIconCircle/BaseIconCircle";

const InitApp = (props) => {
  const { className = "", style = {} } = props;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const UIActions = useUIActions();
  const modelId = "base";

  UIActions.modifyModel({ id: "baseModalDepNew" });

  const ModelUser = useModelUser();
  const userToken = getUserToken();
  const userMe = useSelector(usersSelector("items.me", false));

  console.log("userToken", userToken);
  console.log("userMe", userMe);

  useEffect(() => {
    if (userToken && !userMe) {
      ModelUser.retrieveItem({
        id: "user",
      });
    }
    if (!userToken && !userMe) {
      navigate("/login");
    }
  }, [userMe, userToken]);

  useEffect(() => {
    if (userMe) {
      navigate("/dashboard/degrees");
    }
  }, [userMe]);

  return (
    <div className={`${className} `} style={style}>
      <React.Fragment>
        <BaseModel modelId="baseModel" />
        <BaseModel modelId="progress" />
      </React.Fragment>
    </div>
  );
};

export default React.memo(InitApp);
