import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { useBreakpoints } from "../../../utils/utils";
import { setPassData } from "../../../redux/global/global.actions";
import { inUrls } from "../../../urls/inUrls";
import Degrees from "../../../pages/Degrees/Degrees";
import Info from "../../../pages/Info/Info";
import CheckDegrees from "../../../pages/CheckDegrees/CheckDegrees";
import TopRightBar from "../../../pages/Dashboard/RightBar/TopRightBar/TopRightBar";

const RightBar = (props) => {
  const { className = "", style = {}, idForPassData, items } = props;
  const bp = useBreakpoints();
  const dispatch = useDispatch();

  return (
    <div
      className={`${className} flex-grow-1 ${bp.isPhone ? "p-2" : "p-5"}`}
      style={{ ...style, minHeight: "calc(100vh - 12rem)" }}
    >
      <TopRightBar items={items} idForPassData={idForPassData} />
      <Routes>
        <Route
          element={<Degrees items={items} idForPassData={idForPassData} />}
          path={inUrls.DEGREES}
        />
        <Route
          element={<CheckDegrees items={items} idForPassData={idForPassData} />}
          path={inUrls.CHECK_DEGREES}
        />
        <Route
          element={<Info items={items} idForPassData={idForPassData} />}
          path={inUrls.INFO}
        />
      </Routes>
      <hr />
      <div className="" style={{}}></div>
    </div>
  );
};

export default RightBar;
