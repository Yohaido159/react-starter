import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const MainPage = (props) => {
  const { className = "", style = {} } = props;
  return (
    <div className={`${className} `} style={style}>
      <h1>HI!</h1>
    </div>
  );
};

export default MainPage;
