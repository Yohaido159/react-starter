import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash.get";

import { setPassData } from "../../../redux/global/global.actions";
import { passDataSelector } from "../../../redux/global/global.selectors";

import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import FormTextField from "../../../reuse/FormTextField/FormTextField";
import BaseCard from "../../../reuse/BaseCard/BaseCard";
import BaseCardBody from "../../../reuse/BaseCardBody/BaseCardBody";
import ListItemsNew from "../../../reuse/ListItemsNew/ListItemsNew";
import YeshivaYearsItem from "./YeshivaYearsItem/YeshivaYearsItem";

const YeshivaYears = (props) => {
  const {
    className = "",
    style = {},
    idForPassData,
    years = 5,
    pathState,
  } = props;
  const dispatch = useDispatch();

  const Yeshiva5YearsState = useSelector(
    passDataSelector(`${idForPassData}.${pathState}Status`, false)
  );

  console.log("Yeshiva5YearsState", Yeshiva5YearsState);
  return (
    <FormTextField
      initText={false}
      idForPassData={idForPassData}
      id={`${pathState}Status`}
      textFromState={Yeshiva5YearsState}
      options={{
        type: "checkbox",
        addComp: (
          <Grid container>
            <Grid container item xs={12}>
              <YeshivaYearsItem
                pathState={`${pathState}`}
                idForPassData={idForPassData}
              />
            </Grid>
          </Grid>
        ),
      }}
      styleOptions={{
        label: (
          <Typography variant="h6">
            {years} שנות לימוד בישיבה גבוהה \ הסדר החל מגיל 18
          </Typography>
        ),
      }}
    />
  );
};

export default YeshivaYears;
