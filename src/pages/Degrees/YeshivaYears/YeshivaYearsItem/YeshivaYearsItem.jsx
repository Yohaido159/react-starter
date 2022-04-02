import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash.get";
import set from "lodash.set";

import { setPassData } from "../../../../redux/global/global.actions";
import { funcBetweenDate } from "../../../../utils/utils";
import { passDataSelector } from "../../../../redux/global/global.selectors";

import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import Grid from "@mui/material/Grid";

import FormTextField from "../../../../reuse/FormTextField/FormTextField";
import BaseCard from "../../../../reuse/BaseCard/BaseCard";
import BaseCardBody from "../../../../reuse/BaseCardBody/BaseCardBody";
import ListItemsNew from "../../../../reuse/ListItemsNew/ListItemsNew";
import AttachFile from "../../AttachFile/AttachFile";

const YeshivaYearsItem = (props) => {
  const { className = "", style = {}, idForPassData, pathState } = props;
  const dispatch = useDispatch();

  const id = pathState;
  const yeshivaYears = useSelector(passDataSelector(`${idForPassData}.${id}`));

  const makeIdInArr = Object.entries(yeshivaYears).reduce((acc, cur) => {
    let newObj = {};
    newObj["id"] = cur[0];
    newObj = { ...newObj, ...cur[1] };
    acc.push(newObj);
    return acc;
  }, []);

  return (
    <ListItemsNew
      list={
        makeIdInArr.length === 0 ? [{ name: "שם הישיבה", id: 0 }] : makeIdInArr
      }
      idForPassData={idForPassData}
      withoutMargin
      id={id}
      initItem={(yearId) => (
        <React.Fragment>
          <Grid container item xs={12}>
            <Grid item md={9} xs={12}>
              <FormTextField
                className="mb-3"
                textFromState={get(yeshivaYears, `${yearId}.name`)}
                idForPassData={`${idForPassData}`}
                styleOptions={{
                  defaultLabel: "אנא הזן את שם הישיבה..",
                  withPadding: false,
                }}
                type="text"
                initText={""}
                id={`${id}.${yearId}.name`}
              />
              <div className="d-flex justify-content-between ">
                <FormTextField
                  className="mb-3"
                  textFromState={get(yeshivaYears, `${yearId}.startDate`)}
                  idForPassData={`${idForPassData}`}
                  styleOptions={{
                    label: "תאריך התחלה",
                    withPadding: false,
                  }}
                  options={{
                    type: "date",
                    func: funcBetweenDate(
                      idForPassData,
                      `${id}.${yearId}.startDate`
                    ),
                  }}
                  initText={new Date()}
                  id={`${id}.${yearId}.startDate`}
                />
                <FormTextField
                  className="mb-3"
                  textFromState={get(yeshivaYears, `${yearId}.endDate`)}
                  idForPassData={`${idForPassData}`}
                  styleOptions={{
                    label: "תאריך סיום",
                    withPadding: false,
                  }}
                  options={{
                    type: "date",
                    func: funcBetweenDate(
                      idForPassData,
                      `${id}.${yearId}.endDate`
                    ),
                  }}
                  initText={new Date()}
                  id={`${id}.${yearId}.endDate`}
                />
              </div>
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
              className="d-flex justify-content-center align-items-center"
            >
              <AttachFile
                options={{ onlyUpload: true }}
                idForPassData={`${idForPassData}`}
                pathState={`${id}.${yearId}.file`}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    />
  );
};

export default YeshivaYearsItem;
