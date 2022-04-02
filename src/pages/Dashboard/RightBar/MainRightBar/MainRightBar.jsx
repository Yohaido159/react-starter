import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const MainRightBar = (props) => {
  const { className } = props;
  return (
    <div className={className}>
      <h1>HI!</h1>
    </div>
  );
};

export default MainRightBar;
