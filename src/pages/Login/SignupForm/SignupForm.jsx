import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

import { passDataSelector } from "../../../redux/global/global.selectors";
import useModelUser from "../../../models/users/users.models";

import Grid from "@mui/material/Grid";

import FormTextField from "../../../reuse/FormTextField/FormTextField";
import ButtonWithDep from "../../../reuse/ButtonWithDep/ButtonWithDep";

const SignupForm = (props) => {
  const { className = "", style = {}, idForPassData } = props;
  const ModelUser = useModelUser();

  const username = useSelector(
    passDataSelector(`${idForPassData}.username`, "")
  );
  const dob = useSelector(passDataSelector(`${idForPassData}.dob`, ""));
  const fullName = useSelector(
    passDataSelector(`${idForPassData}.fullName`, "")
  );
  const password1 = useSelector(
    passDataSelector(`${idForPassData}.password1`, "")
  );
  const password2 = useSelector(
    passDataSelector(`${idForPassData}.password2`, "")
  );

  let full_name = fullName.trim();

  const handleClickSend = () => {
    if (password1 !== password2) {
      alert("הסיסמאות אינם זהות");
    }
    const first_name = full_name.split(" ")[0];
    const last_name = full_name.split(" ").splice(1, 2).join(" ");

    if (!last_name) {
      alert("אנא הזן שם משפחה");
    }

    ModelUser.createItem({
      payload: {
        username,
        first_name,
        last_name,
        dob: dob.toISOString().split("T")[0],
        password1,
        password2,
      },
    });
  };

  return (
    <div
      className={`${className}  d-flex flex-column  height-inherit `}
      style={style}
    >
      <Grid container className="bg-white flex-grow-1  ">
        <Grid item xs={12} className=" ">
          <div className="pt-3 text-center">
            <h3 className="">
              <strong>הרשמה</strong>
            </h3>
            <h5 className="mt-3">
              <strong>
                רשום כבר?
                <Link className="mr-2" to="/">
                  התחבר
                </Link>
              </strong>
            </h5>
            <hr />
          </div>
          <FormTextField
            className="mr-3 ml-3 mb-2"
            textFromState={fullName}
            idForPassData={`${idForPassData}`}
            styleOptions={{
              withPadding: false,
              defaultLabel: "אנא הזן שם מלא (פרטי + משפחה)..",
              label: "שם מלא (פרטי + משפחה)",
            }}
            initText={""}
            id={`fullName`}
          />
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
            textFromState={dob}
            idForPassData={`${idForPassData}`}
            styleOptions={{
              withPadding: false,
              defaultLabel: "אנא הזן תאריך לידה..",
              label: "תאריך לידה",
              dateType: "mobile",
            }}
            options={{
              type: "date",
            }}
            initText={""}
            id={`dob`}
          />

          <FormTextField
            className="mr-3 ml-3 mb-2"
            textFromState={password1}
            idForPassData={`${idForPassData}`}
            styleOptions={{
              withPadding: false,
              defaultLabel: "אנא הזן סיסמא..",
              label: "סיסמא",
            }}
            type="password"
            initText={""}
            id={`password1`}
          />
          <FormTextField
            className="mr-3 ml-3 mb-2"
            textFromState={password2}
            idForPassData={`${idForPassData}`}
            styleOptions={{
              withPadding: false,
              defaultLabel: "אנא הזן שוב את הסיסמא..",
              label: "חזור על הסיסמא",
            }}
            type="password"
            initText={""}
            id={`password2`}
          />
          <div className="pl-3 pr-3">
            <ButtonWithDep
              className="mt-3 "
              variant="contained"
              onClick={handleClickSend}
              fullWidth
              label="שלח"
              deps={{
                fullName: { value: fullName },
                dob: { value: dob },
                username: { value: username },
                password1: { value: password1 },
                password2: { value: password2 },
              }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignupForm;
