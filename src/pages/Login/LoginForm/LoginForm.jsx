import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

import useModelUser from "../../../models/users/users.models";
import { passDataSelector } from "../../../redux/global/global.selectors";

import Grid from "@mui/material/Grid";

import FormTextField from "../../../reuse/FormTextField/FormTextField";
import ButtonWithDep from "../../../reuse/ButtonWithDep/ButtonWithDep";

const LoginForm = (props) => {
  const { className = "", style = {}, idForPassData } = props;
  const ModelUser = useModelUser();
  const username = useSelector(
    passDataSelector(`${idForPassData}.username`, "")
  );
  const password = useSelector(
    passDataSelector(`${idForPassData}.password`, "")
  );

  const handleClickSend = () => {
    ModelUser.login({
      payload: {
        username,
        password,
      },
    });
  };

  return (
    <div
      className={`${className} d-flex flex-column  height-inherit `}
      style={style}
    >
      <Grid container className="bg-white flex-grow-1  ">
        <Grid item xs={12} className=" ">
          <div className="pt-3 text-center">
            <h3 className="">
              <strong>התחברות</strong>
            </h3>
            <h5 className="mt-3">
              <strong>
                לא רשום?
                <Link className="mr-2" to="signup">
                  הרשם
                </Link>
              </strong>
            </h5>
            <hr />
          </div>
          <FormTextField
            className="mr-3 ml-3 mb-2"
            textFromState={username}
            idForPassData={`${idForPassData}`}
            styleOptions={{
              withPadding: false,
              defaultLabel: "אנא הזן את שם המשתמש..",
              label: "שם המשתמש",
            }}
            initText={""}
            id={`username`}
          />
          <FormTextField
            className="mr-3 ml-3 mb-2"
            textFromState={password}
            idForPassData={`${idForPassData}`}
            styleOptions={{
              withPadding: false,
              defaultLabel: "אנא הזן את הסיסמא..",
              label: "סיסמא",
            }}
            type="password"
            initText={""}
            id={`password`}
          />

          <div className="pl-3 pr-3">
            <ButtonWithDep
              className="mt-3 "
              variant="contained"
              onClick={handleClickSend}
              fullWidth
              label="שלח"
              deps={{
                username: { value: username },
                password1: { value: password },
              }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginForm;
