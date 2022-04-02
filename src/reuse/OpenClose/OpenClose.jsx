import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const OpenClose = (props) => {
  const {
    className = "",
    style = {},
    inital = "close",
    children,
    comp = {},
  } = props;

  const { head, body } = comp;
  const [open, setOpen] = useState("open");

  useEffect(() => {
    setOpen(inital);
  }, [inital]);

  const handleClick = () => {
    if (body) {
      if (open === "open") {
        setOpen("close");
      } else if (open === "close") {
        setOpen("open");
      }
    }
  };

  return (
    <div>
      <div onClick={handleClick}>{head}</div>
      {open === "open" ? <div>{body}</div> : null}
    </div>
  );
};

export default OpenClose;
