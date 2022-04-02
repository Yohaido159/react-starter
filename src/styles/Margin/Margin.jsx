import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { withReturnArray } from "../../utils/utils";

const Margin = props => {
  const { className, children, size = "medium", config = {} } = props;
  const [sizeNumber, setSizeNumber] = useState();

  useEffect(() => {
    if (size === "large") {
      setSizeNumber("4");
    } else if (size === "medium") {
      setSizeNumber("3");
    } else if (size === "small") {
      setSizeNumber("2");
    }
  }, [size]);

  return (
    <div
      className={`
      ${config.top ? "mt-" + sizeNumber : ""} 
      ${config.bottom ? "mb-" + sizeNumber : ""} 
      ${config.left ? "ml-" + sizeNumber : ""} 
      ${config.right ? "mr-" + sizeNumber : ""}`}
    >
      {children}
    </div>
  );
};

export default Margin;
