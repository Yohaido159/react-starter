import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

import { useBreakpoints } from "../../utils/utils";

import Grid from "@mui/material/Grid";

import LoginForm from "./SignupForm/SignupForm";
import SignupForm from "./LoginForm/LoginForm";

const Login = (props) => {
  const { className = "", style = {} } = props;
  const bp = useBreakpoints();

  const idForPassData = "Login";
  return (
    <div className={`${className}  height-inherit `} style={style}>
      <Grid container className="height-inherit">
        <Grid item xs={12} md={5} className="height-inherit">
          <div
            className="height-inherit "
            style={{
              backgroundColor: "var(--color-background-notification-blue)",
            }}
          >
            <div className={`height-inherit ${bp.isPhone ? "p-2" : "p-5"}`}>
              <Routes>
                <Route
                  path="*"
                  element={<SignupForm idForPassData={idForPassData} />}
                />
                <Route
                  path="signup"
                  element={<LoginForm idForPassData={idForPassData} />}
                />
              </Routes>
            </div>
          </div>
        </Grid>
        {!bp.isPhone && (
          <Grid item md={7} className="height-inherit">
            <div className="height-inherit ">
              <img src="bg2.png" className="image-center" alt="bgimage" />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Login;
