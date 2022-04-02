import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const TitleLeftBar = (props) => {
  const { className = "", style = {}, title } = props;
  return (
    <div className={`${className} fs-3 fw-1 `} style={style}>
      {title}
      <hr />
    </div>
  );
};

export default TitleLeftBar;
