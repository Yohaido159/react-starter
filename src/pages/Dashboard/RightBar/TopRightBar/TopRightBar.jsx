import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash.get";
import classNames from "classnames";

import { useGetPathname, useBreakpoints } from "../../../../utils/utils";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import TitleLeftBar from "../../LeftBar/TitleLeftBar/TitleLeftBar";
import ListLeftBar from "../../LeftBar/ListLeftBar/ListLeftBar";

const TopRightBar = (props) => {
  const { className, idForPassData, items } = props;
  const location = useGetPathname();
  const [drawer, setDrawer] = useState({ open: false, anchor: "right" });

  const title = get(items, `${location}.title`);
  const bp = useBreakpoints();
  const clx = classNames(bp.isPhone ? "" : "p-5");

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer((state) => ({ ...state, open }));
  };
  console.log("bp.isPhone", bp.isPhone);

  return (
    <div
      className={`${className} position-relative text-center d-flex justify-content-center`}
    >
      {bp.isPhone && (
        <div
          className="position-absolute "
          style={{ right: "15px", top: "5px" }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <div className="bg-white d-inline-block circle paper-s6">
              <IconButton
                color="primary"
                className=" fs-33"
                size="large"
                onClick={toggleDrawer(true)}
              >
                {<MenuRoundedIcon />}
              </IconButton>
            </div>
          </div>
          <SwipeableDrawer
            anchor={drawer.anchor}
            open={drawer.open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <div className="p-3 rtl">
              <TitleLeftBar
                className="flex-grow-0"
                style={{ marginTop: "1rem" }}
                title={title}
              />
              <ListLeftBar items={items} className="flex-grow-1" />
            </div>
          </SwipeableDrawer>
        </div>
      )}

      <div className="w-100">
        <h1>{title}</h1>
        <hr />
      </div>
    </div>
  );
};

export default TopRightBar;
