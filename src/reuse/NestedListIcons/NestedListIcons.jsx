import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import OpenClose from "../../reuse/OpenClose/OpenClose";

const NestedListIcons = (props) => {
  let { className = "", style = {}, items = {} } = props;

  return (
    <div className={`${className} `} style={style}>
      {Object.values(items).map((item) => (
        <div key={item.id} className="mt-2 mb-2">
          <OpenClose comp={item.comp} />
        </div>
      ))}
    </div>
  );
};

export default NestedListIcons;
