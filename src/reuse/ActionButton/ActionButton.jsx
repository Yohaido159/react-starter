import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setPassData } from "../../redux/global/global.actions";

import Button from "@mui/material/Button";

const ActionButton = (props) => {
  const { className = "", style = {}, comp } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const otherProps = {};
  if (comp.icon) {
    otherProps["endIcon"] = comp.icon;
  }

  const handleClick = (comp) => () => {
    navigate(`${comp.link}`);
    dispatch(
      setPassData({
        path: "Dashboard",
        data: {
          title: comp.title,
          link: comp.link,
        },
      })
    );
  };

  return (
    <div className={`${className} `} style={style}>
      <Button
        {...otherProps}
        onClick={handleClick(comp)}
        className="w-100"
        variant="contained"
      >
        <div className={`${comp.icon ? "ml-2" : ""}`}>{comp.label}</div>
      </Button>
    </div>
  );
};

export default ActionButton;
