import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash.get";
import cloneDeep from "lodash.clonedeep";

import { withReturnArray } from "../../../utils/utils";
import { dashboardSelector } from "../../../redux/global/global.selectors";
import { useUIActions } from "../../../redux/UI/UI.actions";

import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";

import BaseCardBody from "../../../reuse/BaseCardBody/BaseCardBody";
import SmallTitle from "../../../reuse/SmallTitle/SmallTitle";
import ButtonWithDep from "../../../reuse/ButtonWithDep/ButtonWithDep";
import BaseIconCircle from "../../../reuse/BaseIconCircle/BaseIconCircle";
import CheckDegree from "../CheckDegree/CheckDegree";

const CheckDegreeSection = (props) => {
  const { className = "", style = {} } = props;
  const UIActions = useUIActions();
  const dashboard = useSelector(dashboardSelector);
  const chooseRoad = dashboard.chooseRoad;

  const handleClick = () => {
    UIActions.openModel({
      id: "baseModel",
    });
  };

  return (
    <div className={`${className} `} style={style}>
      <BaseCardBody className="mt-3  ">
        <SmallTitle>בדוק נתונים</SmallTitle>
        <hr />
        <Grid container className="" style={{}}>
          <Grid item xs={12} className="fs-32 d-flex justify-content-center">
            <ButtonWithDep
              label="בדוק"
              onClick={handleClick}
              variant="contained"
              style={{ minWidth: "10rem" }}
              deps={{
                first: { value: chooseRoad },
              }}
            />
          </Grid>
        </Grid>
      </BaseCardBody>
    </div>
  );
};

export default CheckDegreeSection;
