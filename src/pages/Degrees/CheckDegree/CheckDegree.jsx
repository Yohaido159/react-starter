import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash.get";
import cloneDeep from "lodash.clonedeep";
import uniqueId from "lodash.uniqueid";
import { wrapAction } from "saga-axios/dist/core";

import { useUIActions } from "../../../redux/UI/UI.actions";
import { usersSelector } from "../../../redux/users/users.selectors";
import useModelUploader from "../../../models/global/upload/upload.models";
import useModelDegrees from "../../../models/degrees/degrees.models";
import useModelDegreeFiles from "../../../models/degree-files/degree-files.models";
import { parseDateString } from "../../../utils/utils";

import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import CheckIcon from "@mui/icons-material/Check";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import { styled } from "@mui/material/styles";

import { passDataSelector } from "../../../redux/global/global.selectors";
import { mapItemToText } from "../mapItemToText";
import { withReturnArray } from "../../../utils/utils";

import BaseCardBody from "../../../reuse/BaseCardBody/BaseCardBody";
import BaseIconCircle from "../../../reuse/BaseIconCircle/BaseIconCircle";
import ButtonWithDep from "../../../reuse/ButtonWithDep/ButtonWithDep";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    textAlign: "right",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "var(--color-background-control-checked)",
    color: theme.palette.common.white,
    fontSize: 20,
    textAlign: "right",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
    textAlign: "right",
  },
}));

const CheckDegree = (props) => {
  const { className = "", style = {} } = props;
  const ModelUploader = useModelUploader();
  const ModelDegrees = useModelDegrees();
  const ModelDegreeFiles = useModelDegreeFiles();
  const UIActions = useUIActions();

  // const [resObj, setResObj] = useState({});
  let userMeDob = useSelector(usersSelector("items.me.dob", false));

  userMeDob = parseDateString(userMeDob);
  console.log("userMeDob", userMeDob);

  const resObj = useRef({});

  const chooseDegree = useSelector(passDataSelector("Dashboard.chooseDegree"));
  const chooseRoad = useSelector(passDataSelector("Dashboard.chooseRoad"));
  const must = useSelector(
    passDataSelector(`Dashboard.${chooseDegree}.${chooseRoad}.must`)
  );
  let localData = cloneDeep(
    useSelector(passDataSelector(`Dashboard.${chooseDegree}.${chooseRoad}`))
  );

  const getAttach = (data, key) => {
    return get(data, `${key}Attach`, []);
  };

  const getErrorMessage = (isValid, hasAttach, mustItem) => {
    let message = "";
    if (!isValid) {
      message = `${message ? `${message},` : ""} לא סימנת את השדה הנצרך`;
    }
    if (!hasAttach) {
      message = `${message ? `${message},` : ""} חסר קובץ מצורף`;
    }
    if (!message) {
      message = "-";
    }
    return message;
  };

  const checkStringToString = (options) => {
    const { data, must, key } = options;
    const dataValue = data[key];
    const dataValueAttach = getAttach(data, key);
    const isValid = dataValue === must[key];
    const hasAttach = Boolean(dataValueAttach.length);
    let errorMessage = getErrorMessage(isValid, hasAttach, must[key]);
    if (data[`${key}Message`] && !isValid) {
      errorMessage = data[`${key}Message`];
    }
    return {
      isValid,
      hasAttach,
      errorMessage,
    };
  };
  const checkStringToList = (options) => {
    const { data, must, key } = options;
    const mustValueList = must[key];
    let find = false;
    let findAttach = false;
    for (let mustValue of mustValueList) {
      const dataValueAttach = getAttach(data, mustValue);
      if (mustValue === data[key]) {
        find = true;
        if (Boolean(dataValueAttach.length)) {
          findAttach = true;
        }
        break;
      }
    }
    const isValid = find;
    const hasAttach = findAttach;
    const errorMessage = getErrorMessage(isValid, hasAttach);
    return {
      isValid,
      hasAttach,
      errorMessage,
    };
  };
  const checkSumDate = (options) => {
    const { data, must, key } = options;
    const dataValueList = data[key] || {};
    const mustValue = must[key];

    const betweenDateAgg = withReturnArray(dataValueList).reduce((acc, cur) => {
      const ageWhenStartYeshiva =
        cur.startDate.getUTCFullYear() - userMeDob.getUTCFullYear();

      if (ageWhenStartYeshiva >= 18) {
        return acc + cur.betweenDate;
      } else {
        let betweenDate = cur.betweenDate - (18 - ageWhenStartYeshiva) * 12;
        betweenDate = Math.max(betweenDate, 0);
        return acc + betweenDate;
      }
    }, 0);

    const hasAttach = withReturnArray(dataValueList).reduce((acc, cur) => {
      let findAttach = false;
      const dataValueAttach = getAttach(cur, "file");
      if (dataValueAttach.length) {
        findAttach = true;
      }
      findAttach ? acc.push(true) : acc.push(false);
      return acc;
    }, []);

    const errorMessage = `שנות הישיבה שלך קטנות מ ${mustValue} חודשים. ישנם רק ${
      betweenDateAgg.toFixed(2) || 0
    } חודשים `;
    const isValid = betweenDateAgg >= mustValue;
    return {
      isValid,
      hasAttach:
        hasAttach.every((item) => item === true) && hasAttach.length > 0,
      errorMessage: isValid ? "-" : errorMessage,
    };
  };

  const makeValidation = (must, data) => {
    let resultObj = {};
    for (let [key, value] of Object.entries(must)) {
      if (key === "yeshiva") {
        resultObj[key] = checkSumDate({
          data,
          must,
          key,
        });
      } else if (typeof value === "string" || typeof value === "boolean") {
        resultObj[key] = checkStringToString({
          data,
          must,
          key,
        });
      } else if (Array.isArray(value)) {
        resultObj[key] = checkStringToList({
          data,
          must,
          key,
        });
      }
    }
    return resultObj;
  };

  const handleClickSend = () => {
    ModelDegrees.createItem({
      payload: {
        degree: chooseDegree,
        road: chooseRoad,
      },
      actions: [
        wrapAction({
          func: (degree_data) => {
            for (let [itemKey, itemValue] of Object.entries(localData)) {
              if (itemKey.endsWith("Attach") || itemKey === "yeshiva") {
                if (itemKey === "yeshiva") {
                  itemValue = withReturnArray(itemValue).reduce((acc, cur) => {
                    acc.push(...cur.fileAttach);
                    return acc;
                  }, []);
                }
                for (let file of itemValue) {
                  if (file.mock) continue;
                  ModelUploader.uploadFile({
                    file,
                    payload: {
                      filename: file.name,
                      folder_name: itemKey,
                    },
                    actions: [
                      wrapAction({
                        func: (data, out_state) => {
                          ModelDegreeFiles.createItem({
                            payload: {
                              degree: degree_data.data.id,
                              road: degree_data.data.road,
                              file: out_state.more_data.url,
                              name: file.name,
                            },
                          });
                        },
                      }),
                    ],
                  });
                }
              }
            }
          },
        }),
        wrapAction({
          func: (degree_data) => {
            UIActions.modifyModel({
              id: "baseModel",
              path: "payload.content",
              data: {
                title: "הושלם בהצלחה!",
                actions: [
                  {
                    type: "comp",
                    size: 12,
                    comp: () => (
                      <div>
                        <BaseIconCircle
                          className="d-flex justify-content-center"
                          icon={<CheckIcon />}
                          backgroundColor="green"
                          size="3"
                          fs="fs-2"
                        />
                      </div>
                    ),
                  },
                ],
              },
              effect: "replace",
            });
          },
        }),
      ],
    });
  };

  useEffect(() => {
    const resultObj = makeValidation(must, localData);
    resObj.current = resultObj;
  }, [must, localData]);

  const renderProblem = () => {
    const arr = [];
    if (!resObj.current) return;

    Object.entries(resObj.current).map(([key, value], index) => {
      console.log("key, value", key, value);
      let name = mapItemToText[key];
      const comp = (
        <StyledTableRow key={uniqueId()}>
          <StyledTableCell>{name}</StyledTableCell>
          <StyledTableCell>
            {value.isValid ? "תקין" : "לא תקין"}{" "}
          </StyledTableCell>
          <StyledTableCell>
            {value.hasAttach ? "תקין" : "חסר קובץ"}
          </StyledTableCell>
          <StyledTableCell>{value.errorMessage}</StyledTableCell>
        </StyledTableRow>
      );
      arr.push(comp);
    });
    const firstItem = (
      <TableContainer>
        <TableHead>
          <TableRow>
            <StyledTableCell>שם</StyledTableCell>
            <StyledTableCell>תקין</StyledTableCell>
            <StyledTableCell>קיים קובץ מצורף</StyledTableCell>
            <StyledTableCell>פרטי שגיאה</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{arr}</TableBody>
      </TableContainer>
    );
    return firstItem;
  };

  return (
    <div className={`${className} `} style={style}>
      <BaseCardBody
        styleOptions={{ className3: "fs-3 d-flex justify-content-between" }}
      >
        <div className="">תואר שנבחר: {mapItemToText[chooseDegree]}</div>
        <div className="">מסלול שנבחר: {mapItemToText[chooseRoad]}</div>
      </BaseCardBody>
      {renderProblem()}

      <div className="d-flex justify-content-center">
        <ButtonWithDep
          className="mt-3"
          variant="contained"
          style={{ minWidth: "20rem" }}
          onClick={handleClickSend}
          label="שלח"
          deps={{
            valid: {
              value: Object.values(resObj.current).reduce((acc, cur) => {
                if (!cur.isValid || !cur.hasAttach) {
                  acc = false;
                }
                return acc;
              }, true),
            },
          }}
        />
      </div>
    </div>
  );
};

export default CheckDegree;
