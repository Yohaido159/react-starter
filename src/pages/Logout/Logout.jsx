import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { usersSelector } from "../../redux/users/users.selectors";
import { setAddToRedux } from "../../redux/global/global.actions";

const Logout = (props) => {
  const { className = "", style = {} } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(
      setAddToRedux({
        type: "USERS_ADD_TO_REDUX",
        effect: "delete",
        path: "items.me",
      })
    );
    navigate("/login");
  }, []);

  return null;
};

export default Logout;
