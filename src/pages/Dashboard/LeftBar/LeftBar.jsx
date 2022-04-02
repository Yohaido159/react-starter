import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash.get";
import classNames from "classnames";

import { useGetPathname, useBreakpoints } from "../../../utils/utils";

import TitleLeftBar from "./TitleLeftBar/TitleLeftBar";
import ListLeftBar from "./ListLeftBar/ListLeftBar";

const LeftBar = (props) => {
  const { className = "", style = {}, items } = props;
  const location = useGetPathname();

  const [drawer, setDrawer] = useState({ open: false, anchor: "right" });

  const title = get(items, `${location}.title`);
  const bp = useBreakpoints();
  const clx = classNames(bp.isPhone ? "" : "p-3");

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer((state) => ({ ...state, open }));
  };

  return (
    <div style={style} className={`${className}   text-right ${clx}`}>
      {bp.isPhone ? null : (
        <React.Fragment>
          <TitleLeftBar
            className="flex-grow-0"
            style={{ marginTop: "1rem" }}
            title={title}
          />
          <ListLeftBar items={items} className="flex-grow-1" />
        </React.Fragment>
      )}
    </div>
  );
};

export default LeftBar;
