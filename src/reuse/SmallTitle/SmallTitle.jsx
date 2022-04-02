import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const SmallTitle = (props) => {
  const { className = "", style = {}, children } = props;
  return (
    <div className={`${className} `} style={style}>
      <h2
        className="text-center "
        style={{ backgroundColor: "var(--color-background-tiles-disabled)" }}
      >
        {children}
      </h2>
    </div>
  );
};

export default SmallTitle;
