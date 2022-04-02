import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import axios from "axios";

import { useBreakpoints } from "../../utils/utils";
import { usersSelector } from "../../redux/users/users.selectors";
import useModelUpload from "../../models/global/upload/upload.models";
import { useUIActions } from "../../redux/UI/UI.actions";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import LeftBar from "./LeftBar/LeftBar";
import RightBar from "./RightBar/RightBar";
import ActionButton from "../../reuse/ActionButton/ActionButton";
import ProgressInModel from "../../reuse/ProgressInModel/ProgressInModel";

const Dashboard = (props) => {
  const { className } = props;
  const idForPassData = "Dashboard";
  const ModelUpload = useModelUpload();
  const UIActions = useUIActions();

  const bp = useBreakpoints();
  console.log("bp.isPhone", bp.isPhone);
  const clx = classNames(bp.isPhone ? "p-2" : "p-5");
  const userMe = useSelector(usersSelector("items.me", false));
  console.log("userMe", userMe);

  const admin = userMe.is_superuser
    ? {
        check_degrees: {
          id: "check_degree",
          title: "בדוק תארים",
          comp: {
            head: (
              <ActionButton
                comp={{
                  title: "בדוק תארים",
                  label: "בדוק תארים",
                  icon: <ArticleRoundedIcon />,
                  link: "check_degrees",
                }}
              />
            ),
          },
        },
      }
    : {};

  const items = {
    degrees: {
      id: "pages",
      title: "תארים",
      comp: {
        head: (
          <ActionButton
            comp={{
              title: "תארים",
              label: "תארים",
              icon: <ArticleRoundedIcon />,
              link: "degrees",
            }}
          />
        ),
      },
    },
    ...admin,
    info: {
      id: "info",
      title: "פרטים אישיים",
      comp: {
        head: (
          <ActionButton
            comp={{
              title: "פרטים אישיים",
              label: "פרטים אישיים",
              icon: <LoginIcon />,
              link: "info",
            }}
          />
        ),
      },
    },
    login: {
      id: "login",
      title: userMe ? "התנתק" : "התחבר",
      comp: {
        head: (
          <ActionButton
            comp={{
              title: userMe ? "התנתק" : "התחבר",
              label: userMe ? "התנתק" : "התחבר",
              icon: userMe ? <LoginIcon /> : <LogoutIcon />,
              link: userMe ? "/logout" : "/login",
            }}
          />
        ),
      },
    },
  };
  return (
    <div
      className={`${clx}`}
      style={{
        minHeight: "calc(100vh -  6rem)",
        backgroundColor: "var(--color-background-tiles-disabled)",
      }}
    >
      <Grid
        container
        spacing={0}
        className="h-100 paper-s6 "
        style={{
          backgroundColor: "var(--white)",
          borderRadius: "54px",
        }}
      >
        {!bp.isPhone && (
          <Grid item xs={2} className=" d-flex flex-column flex-grow-0 nowrap">
            <LeftBar
              items={items}
              className="d-flex flex-column flex-grow-1"
              style={{
                borderTopRightRadius: "54px",
                borderBottomRightRadius: "54px",
                backgroundColor: "var(--color-background-control-disabled)",
              }}
            />
          </Grid>
        )}
        <Grid item xs>
          <RightBar
            items={items}
            idForPassData={idForPassData}
            className="d-flex flex-column"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
